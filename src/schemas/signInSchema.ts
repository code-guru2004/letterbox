import { z } from "zod";


export const signInSchema = z.object({
    identifier : z.string().min(5, { message: "username/email must be with 5 character" })
    .max(50, { message: "Message must have atmost 50 character" }), //identifier = username | email
    password : z.string().min(5, { message: "Psssword must atleast 5 characters" }),
})
