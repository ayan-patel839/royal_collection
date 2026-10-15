import { getProducts } from "@/actions/productActions";
import { getStoreAnalytics } from "@/actions/adminActions"; // <-- Aggregation import
import AddProductForm from "@/components/AddProductForm";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";

export default async function AdminDashboard() {
  // Parallel Data Fetching: Products aur Stats dono ek sath fetch hongi
  const [products, stats] = await Promise.all([
    getProducts(),
    getStoreAnalytics()
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-zinc-950">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">👑 Admin Dashboard</h1>

      {/* Aggregation Report Cards - Premium Dark Mode */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-zinc-400 text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-white mt-2">{stats?.totalItems || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-zinc-400 text-sm font-medium">Inventory Value</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">₹{stats?.totalInventoryValue || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-zinc-400 text-sm font-medium">Average Price</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">₹{Math.round(stats?.averagePrice || 0)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
          <p className="text-zinc-400 text-sm font-medium">Maximum Price</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">₹{stats?.maximumPrice || 0}</p>
        </div>
      </div>

      <AddProductForm />

      <div className="w-full max-w-4xl bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-2xl mt-8">
        <h2 className="text-2xl font-bold text-zinc-100 mb-6 border-b border-zinc-800 pb-4">Manage Products ⚙️</h2>

        {/* Premium Dark Mode List for Admin */}
        <div className="flex flex-col gap-4">
          {products.map((item: any) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div>
                <h3 className="font-bold text-zinc-100 text-lg">{item.name}</h3>
                <p className="text-emerald-400 font-semibold tracking-wide mt-1">₹{item.price}</p>
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