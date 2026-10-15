import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function getDashboardStats() {

    try{

        await connectDB()

        const stats = await Order.aggregate([
            {
                $match:{
                    paymentStatus: "paid"
                } 
            } , 

            {
                $group:{
                   _id:null , 
                   totalRevenue:{$sum: "$totalAmount"} , 
                   totalOrders:{$sum: 1 }

                }
            }
        ])

        if (stats.length === 0 ) {
            
            return {totalRevenue : 0 , totalOrders:0}
        }
        return JSON.parse(JSON.stringify(stats[0]))
    }

    catch (error){

        console.error("Dashboard data lane me error:" , error )
        return {totalRevenue:0 , totalOrder:0}

    }
}