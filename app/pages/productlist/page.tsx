'use client'
import { GetProductsClient, DeleteProductClient } from '@/utils/data/productsclient';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Page() {
  interface Product {
    id: number;
    Name: string | null;
    Description: string | null;
    Price: number | null;
    ProductType: { TypeName: string | null; } | null;
  }

  const [productsWithType, setProductsWithType] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const products = await GetProductsClient();
      setProductsWithType(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await DeleteProductClient(productId);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete the product. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:w-1/2 sm:w-auto mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Product List</h1>
      <ul role="list" className="border p-4 rounded-md shadow divide-y divide-gray-100">
        {productsWithType && productsWithType.length > 0 ? (
          productsWithType.map((product) => (
            <li key={product.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{product.Name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.Description}</p>
                  {product.ProductType && (
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.ProductType.TypeName}</p>
                  )}
                </div>
              </div>
              <div className="shrink-0 flex flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">€{product.Price ? product.Price.toFixed(2) : '0.00'}</p>
                <div className="mt-2 flex space-x-2">
                  <Link href={`/pages/editproduct/${product.id}`}>
                    <button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}  
      </ul>
    </div>
  )
}

