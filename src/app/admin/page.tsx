import { getProducts } from "@/actions/productActions";
import AddProductForm from "@/components/AddProductForm";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">👑 Admin Dashboard</h1>

      {/* Add Product Form sirf Admin ko dikhega */}
      <AddProductForm />

      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Products ⚙️</h2>

        {/* Simple List for Admin */}
        <div className="flex flex-col gap-4">
          {products.map((item: any) => (
            <div key={item._id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              <div>
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-green-600 font-semibold">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <EditButton productId={item._id} currentName={item.name} currentPrice={item.price} />
                <DeleteButton productId={item._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}