import { z } from "zod";


export const usernameValidation = z
  .string()
  .max(20, "Username must be atleast 3 characters")
  .min(3, "Username must be atmost 20 characters")
  .regex(
    /^[a-zA-Z0-9_]{3,20}$/,
    "Username must be 3-20 characters long and contain only letters, numbers, or underscores"
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(5, { message: "Psssword must atleast 5 characters" }),
});
