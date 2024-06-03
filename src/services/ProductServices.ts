import axios from "axios";
import { DrafProductsSchema , Product, ProductSchema, ProductsSchema} from "../types";
import {   safeParse } from "valibot";
import { toBoolean } from "../utils";

//Creamos el type de la data
type ProductData= {
    [k:string]: FormDataEntryValue
}

export  async function  addProduct(data: ProductData){
    try {
        //validamos con valibot
        const result= safeParse(DrafProductsSchema, {
            name: data.name,
            price: +data.price
        })
      
        if(result.success){

            const url= `${import.meta.env.VITE_API_URL}/api/productos`
           //usamos post con axios
            await axios.post (url, {
                name:result.output.name,
                price: result.output.price
            })


        }else{
            throw new Error("datos no validos");
        }

        
    } catch (error) {
        console.log(error);
    }



}

export async function getProducts(){
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/productos`
        const{data}= await axios(url)
        console.log(data.data);
        const result= safeParse(ProductsSchema, data.data)
      
        
        if(result.success) {
            return result.output
        }else{
            throw new Error("Hubo un error");
            
        }
        
    } catch (error) {
        console.log('error')
    }
}

export async function getProductsById(id: Product['id']){
    try{
        const url =`${import.meta.env.VITE_API_URL}/api/productos/${id}`
        const {data} = await axios(url);
        const result =safeParse(ProductSchema, data.data)
        
        if(result.success){
           return result.output
        }else{
            throw new Error("Error getting products")
        }
    

    }catch(error){
       console.log('error')
    }
}

export async function updateProduct(data :ProductData , id: Product['id'] ){
    try {
        
        const result= safeParse(ProductSchema, {
            id:id,
            name: data.name,
            price: +data.price,
            disponible: toBoolean(data.disponible.toString())
        })
        if(result.success){
            const url =`${import.meta.env.VITE_API_URL}/api/productos/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
       
    }
}

export async function deleteProduct(id: Product['id']){
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/productos/${id}`

        await axios.delete(url)
        
        
    } catch (error) {
        console.log(error)
    }
}
 
export async function updateDisponibilidad(id: Product['id']){
   try {
    console.log(id)
    const url =`${import.meta.env.VITE_API_URL}/api/productos/${id}`

    await axios.patch(url)
    
    
   } catch (error) {
      console.log(error)
   }
}