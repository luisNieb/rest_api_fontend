import {
  Link,
  Form,
  useActionData,
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {
  getProductsById,
  updateProduct
} from "../services/ProductServices";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  //params cuado la url lleva paramtros ya sea un id para consultar
  if (params.id !== undefined) {
    const product = await getProductsById(+params.id);
    if (!product) {
      // throw new Response('', {status: 200, statusText: 'No encontrado'})
      return redirect("/");
    }
    return product;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length > 0) {
    return error;
  }

  if (params.id !== undefined) {
    //esperamos para redirecionar
    await updateProduct(data, +params.id);
    //funcion que redireccinaminto
    return redirect("/");
  }
}

const availabilityOptions=[
  {name: 'Disponible', value:true},
  {name: 'No disponible', value:false},
]

export default function EditProduct() {
  const error = useActionData() as string;
  //usamos el state de nuestro loader
  const product = useLoaderData() as Product;

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          {" "}
          Editar Productos
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500 "
        >
          Volver a Productos
        </Link>
      </div>

      <Form className="mt-10" method="POST">
       
        <ProductForm
           product={product}
        />
        <div className="mb-4">
          <label htmlFor="disponible" className="text-grey-800">Disponibilidad:</label>
          <select 
              name="disponible" 
              id="disponible"  
              className="mt-2 block w-full p-3 bg-gray-50"
              defaultValue={product?.disponible.toString()}
              >
                {availabilityOptions.map(options => (
                  <option key={options.name} value={options.value.toString()}>{options.name}</option>
                ))}

          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
}
