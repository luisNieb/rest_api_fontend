import { Link, Form, useActionData, redirect, ActionFunctionArgs } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductServices";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs){

  const data= Object.fromEntries(await request.formData())
  let error=''
  if(Object.values(data).includes('')){
    error='Todos los campos son obligatorios'
  }
  if(error.length > 0){
    return error
  }
    //esperamos para redirecionar
  await addProduct(data)
  //funcion que redireccinaminto 
  return redirect('/')

}

export default function NewProduct() {

  const error= useActionData() as string

  
  return (
    <>
      { error && <ErrorMessage>{error}</ErrorMessage> }
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          {" "}
          Registrar Productos
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500 "
        >
          Volver a Productos
        </Link>
      </div>

      <Form className="mt-10"
             method="POST"
             
             >
         <ProductForm />
         
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
