import mongoose from "mongoose";

export interface Iproduct {

    name: String,
    price: Number,
    image: String

}

const prodcutSchema = new mongoose.Schema<Iproduct>({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },


    image: {
        type: String,
        default: "https://via.placeholder.com/150", // Agar image na de toh yeh apne aap lag jayegi
    },


}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model<Iproduct>("Product", prodcutSchema)

export default Product;