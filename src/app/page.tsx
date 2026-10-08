import { getProducts } from "@/actions/productActions";
import AddToCartButton from "@/components/AddToCartButton";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (

    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 bg-zinc-800">

      <div className="w-full max-w-6xl mt-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center tracking-tighter">
          ROYAL COLLECTION
        </h2>

        {/* Midnight Stealth Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((item: any) => (
            <div key={item._id} className="bg-zinc-900 p-6 rounded-3xl shadow-2xl hover:shadow-zinc-700/20 transition-all duration-300 border border-zinc-800 flex flex-col justify-between">

              <div>
                {/* Image Container - White bg for Nike/Apple style product pop */}
                <div className="relative h-64 w-full mb-6 rounded-2xl overflow-hidden group bg-white border border-zinc-800 flex items-center justify-center p-4">
                  <img
                    src={item.image || "/globe.svg"}
                    alt={item.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100 line-clamp-2 leading-snug tracking-wide">{item.name}</h3>
              </div>

              <div className="mt-6">
                <p className="text-white font-extrabold text-3xl mb-5 tracking-tight">₹{item.price.toLocaleString("en-IN")}</p>
                <AddToCartButton item={item} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>


  )
}