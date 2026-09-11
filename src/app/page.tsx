import { getProducts } from "@/actions/productActions";
import AddToCartButton from "@/components/AddToCartButton";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">

      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">KAIF Collection Products 👑</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((item: any) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between">

              <div>
                <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Image Placeholder</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              </div>

              <div>
                <p className="text-green-600 font-bold text-xl mt-4">₹{item.price}</p>
                <AddToCartButton item={item} />
              </div>

            </div>
          ))}
        </div>
      </div>

    </main>
  );
}