import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: Products } = await supabase.from('Products').select('*');

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {Products?.length > 0 ? (
        Products.map((product) => (
          <li key={product.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{product.Name}</p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">{product.Description}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{product.Price}</p>
            </div>
          </li>
        ))
      ) : (
        <li>No products found</li>
      )}
    </ul>
  );
}



