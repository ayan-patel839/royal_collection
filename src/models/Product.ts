import mongoose from "mongoose";

export interface Iproduct {

    name: String,
    price: Number,
    image: String
    embedding?: number[]



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
        required: true
    },

    embedding: {
        type: [Number],
        default: [],
    },


}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model<Iproduct>("Product", prodcutSchema)

export default Product;
