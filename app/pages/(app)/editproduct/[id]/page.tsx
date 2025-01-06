'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { decrypt } from '@/utils/encryption'
import { use } from 'react'
import { FetchProductTypes } from '@/utils/data/productsclient'

type Params = {
  id: string;
};

export default function EditProduct({ params: paramsPromise }: { params: Promise<Params> }) {
  const params = use(paramsPromise)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [productTypeId, setProductTypeId] = useState('')
  const [productTypes, setProductTypes] = useState<Array<{ id: number; TypeName: string | null }>>([])
  const [loading, setLoading] = useState(false)
  const [decryptedId, setDecryptedId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()


  useEffect(() => {
    if (params && params.id) {
      console.log('Params ID:', params.id);
      try {
        const decrypted = decrypt(params.id);
        setDecryptedId(decrypted);
        fetchProductTypes();
        fetchProductDetails(decrypted);
      } catch (error) {
        console.error('Error decrypting ID:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
        }
        alert('Invalid product ID. Redirecting to product list.');
        router.push('/pages/productlist');
      }
    }
  }, [fetchProductDetails, params, router]);

  async function fetchProductTypes() {
    const producttypes = await FetchProductTypes();
    setProductTypes(producttypes || [])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchProductDetails(id: string) {
    const {data, error} = await supabase
        .from('Products')
        .select('*, ProductType(id, TypeName)')
        .eq('id', id)
        .single()

    if (error) {
      console.error('Error fetching product details:', error)
    } else if (data) {
      setName(data.Name || '')
      setDescription(data.Description || '')
      setPrice(data.Price?.toString() || '')
      setProductTypeId(data.ProductType_Id?.toString() || '')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!decryptedId) {
      alert('Invalid product ID. Please try again.')
      return
    }
    setLoading(true)

    const {error} = await supabase
        .from('Products')
        .update({
          Name: name,
          Description: description,
          Price: parseFloat(price),
          ProductType_Id: parseInt(productTypeId)
        })
        .eq('id', decryptedId)

    setLoading(false)

    if (error) {
      alert('Error updating product. Please try again.')
      console.error('Error updating product:', error)
    } else {
      alert('Product updated successfully!')
      router.push('/pages/productlist')
    }
  }

  function handleCancel() {
    router.push('/pages/productlist')
  }

  if (!decryptedId) {
    return <div>Loading...</div>
  }

  return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">Price</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                step="0.01"
                className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="productType" className="block mb-1">Product Type</label>
            <select
                id="productType"
                value={productTypeId}
                onChange={(e) => setProductTypeId(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a Product Type</option>
              {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.TypeName}
                  </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
            <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
  )
}