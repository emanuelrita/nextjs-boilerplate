import { QueryData } from "@supabase/supabase-js/dist/module/lib/types";
import { createClient } from "../supabase/server";



export  async function GetProductsServer() {

    const supabase = await createClient()
    const productsWithTypeQuery = supabase
      .from("Products")
      .select(`id, Name, Description, Price, ProductType(TypeName)`);
    type ProductsWithType = QueryData<typeof productsWithTypeQuery>;
  
    const { data, error } = await productsWithTypeQuery;
    if (error) throw error;
    const productsWithType: ProductsWithType = data;

    return productsWithType;

}

export async function DeleteProductServer(productId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("Products")
    .delete()
    .eq('id', productId);
  
  if (error) throw error;
  return { success: true };
}
