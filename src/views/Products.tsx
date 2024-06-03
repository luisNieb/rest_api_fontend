import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateDisponibilidad } from "../services/ProductServices"
import { Product } from "../types"
import ProductDetail from "../components/ProductDetail"



export async function loader(){
  const produtcs = await getProducts()
 

  return produtcs
}

export async function action({request}:ActionFunctionArgs){
  const data= Object.fromEntries(await request.formData())

  await updateDisponibilidad(+data.id)
  
  return{}
}

export default function Products() {

  const products = useLoaderData() as Product[]
  
  return (
    <>
    <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link 
          to='productos/nuevo'
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500 "
          
          >
            Agregar producto

        </Link>
    </div>

    <div className="p-2">
      <table className="w-full mt-5 table-auto ">
        <thead className="bg-indigo-300">
          <th className="p-2">Productos</th>
          <th className="p-2">precio</th>
          <th className="p-2">disponibilidad</th>
          <th className="p-2">Acciones</th>

        </thead>
        <tbody>
          {products.map(product => (
            <ProductDetail
                key={product.id}
                product={product}
            />
          ))}


        </tbody>
      </table>
    </div>
      
    </>
  )
}
