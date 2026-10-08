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
        required : true
    },


}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model<Iproduct>("Product", prodcutSchema)

export default Product;