import { z } from "zod";

export const productSchema = z.object({

    name: z.string().min(2, "Name must be have 2 letters"),

    price: z.coerce.number().positive("price hamesha 0 se zyada honi chhahiye"),

    image: z.string().min(1, "Image URL is required")

})