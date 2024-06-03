import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products ,{loader as productsLoadaer ,action as updateDisponibilidadAction} from "./views/Products";
import NewProduct ,{action as newProductAction} from "./views/NewProduct";
import EditProduct, { loader as editProduct , action as editProductAction} from "./views/EditProduct";
import {action as deleteProductAction} from "./components/ProductDetail";


export const router= createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                index:true,
                element: <Products />,
                loader: productsLoadaer,
                action: updateDisponibilidadAction
            },
            {
                path: "/productos/nuevo",
                element: <NewProduct/>,
                action: newProductAction
            },{
                path: "/productos/:id/editar" ,//ROA Pattern 
                element: <EditProduct/>,
                loader: editProduct,
                action: editProductAction
            },
            {
                path: "/productos/:id/eliminar",
                action:deleteProductAction
            }
        ]
    }
]);