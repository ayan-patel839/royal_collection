import { email, z } from "zod"

export const checkoutSchema = z.object({

    fullName: z.string().min(3 , "Name kam se kam 3 letters se zayada hone chahiye"),
    email: z.string().email("Inavlid Email he Try again") ,
    phone: z.string().length(10 , "phone number exactly 10 numbers se zayada hone chaiye"),
    address: z.string().min(10 , "pora addres likho" )
 
})

export type checkoutFormdata = z.infer<typeof checkoutSchema>;