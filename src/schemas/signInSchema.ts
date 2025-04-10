import { z } from "zod";


export const signInSchema = z.object({
    identifier : z.string(), //identifier = username | email
    password : z.string()
})
