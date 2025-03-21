import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";
import BaseLayout from "../layout/BaseLayout";
import AdminHomePage from "@/page/admin/AdminHomePage";
import AdminProductPage from "@/page/admin/product/AdminProductPage";
import AdminProductForm from "@/component/admin/product/AdminProductForm";
import AdminProductFormPage from "@/page/admin/product/AdminProductFormPage";
import AdminProductDelatePage from "@/page/admin/AdminProductDeletePage";
import RegisterPage from "@/page/RegisterPage";
import LoginPage from "@/page/LoginPage";
import LogoutPage from "@/page/LogoutPage";
import Guard from "@/component/common/Guard";



const router = createBrowserRouter([
    {
        //préfixe de toutes des URL enfents 
        path: '/',
        //utilisation d'une mise en page
        element: <BaseLayout/>,
         //référencer les pages utilisant la mise en page
        children:[
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'contact',
                element: <ContactPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'logout',
                element: <LogoutPage/>
            }

            // {
            //     path: 'product/:id',
            //     element: <ProductDetailsPage />
            // },
        ],
       
    },
    {
        path: '/contact',
        element: <ContactPage />
    },
    {
        //préfixe de toutes des URL enfents 
        path: '/admin/',
        //utilisation d'une mise en page
        element:
            <Guard roles={['admin']}><BaseLayout/></Guard>,
         //référencer les pages utilisant la mise en page
        children:[
            {
                path: '',
                element: <AdminHomePage />
            },
            {
                path: 'product',
                element: <AdminProductPage />
            },
            {
                path: 'product/form',
                element: <AdminProductForm />
            },
            {
                path: 'product/form/:id?',
                element: <AdminProductFormPage />
            },
            {
                path: 'product/delete/:id',
                element: <AdminProductDelatePage/>
            }
        ],
  
    },
]);
export default router;