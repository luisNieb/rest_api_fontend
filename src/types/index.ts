import { boolean, number, object, string , array, InferOutput } from "valibot"

export const DrafProductsSchema= object({
    name:string(),
    price:number()
})

export const  ProductSchema= object({
    id: number(),
    name: string(),
    price: number(),
    disponible: boolean()
})

export const ProductsSchema= array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>