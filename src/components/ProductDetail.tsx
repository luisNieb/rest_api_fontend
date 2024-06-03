import {  ActionFunctionArgs, Form, useNavigate ,redirect, useFetcher} from 'react-router-dom';
import { Product } from "../types";
import { formtCurrencncy } from "../utils";
import { deleteProduct } from '../services/ProductServices';

type ProductDeatailProps = {
  product: Product;
};

export async function action({params}:ActionFunctionArgs){

  if (params.id !== undefined ){

      await deleteProduct(+params.id);

      return redirect('/')
  }
  
    

}

export default function ProductDetail({ product }: ProductDeatailProps) {
    const isAvailable = product.disponible

    const fetcher= useFetcher()

    //usar useNavigate 
    const navigete= useNavigate()


  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">{formtCurrencncy(product.price)}</td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method='POST'>
          <button type='submit'
                  name="id"
                  value={product.id}
                  className={`${isAvailable ? 'text-black ' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black cursor-pointer`}
          >
          {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
       
        
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex gap-2 items-center">
               
                <button
                   onClick={()=> navigete(`/productos/${product.id}/editar`)}
                   className='bg-indigo-600 hover:bg-indgo-500 text-sm rounded-lg w-full p-2 uppercase font-bold text-center text-white'
                  
                >
                  Editar
                </button>
                <Form  
                    className='w-full'
                    method='POST'
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e)=>{
                       if(!confirm('Eliminar')){
                        e.preventDefault();

                       }
                    }}
                    >
                     <input type="submit"
                            value="eliminar"
                            className='bg-red-600 hover:bg-indgo-500 w-full text-sm rounded-lg p-2 uppercase font-bold text-center text-white'
                     />
                </Form>
        </div>
      </td>
    
    </tr>
  );
}
