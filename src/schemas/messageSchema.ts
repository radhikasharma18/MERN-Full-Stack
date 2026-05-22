import {z} from "zod" ;

export const messageSchema =z.object({ 
  
    content:z
    .string()
    .min(2,{ message: "Content must be at least 2 characters long" })
    .max(1000)

})