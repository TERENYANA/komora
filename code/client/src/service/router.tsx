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
import AdminLayout from "@/layout/AdminLayout";
import AdminOrdersPage from "@/page/admin/AdminOrdersPage";
import AdminUsersPage from "@/page/admin/AdminUserPage";
import ClientHomePage from "@/page/client/ClientHomePage";
import AdminSendEmailPage from "@/page/admin/AdminSendEmailPage";
import CatalogPage from "@/page/CatalogPage";
import CatalogAllPage from "@/page/client/CatalogAllPage";
import TermsAndConditionsPage from "@/page/client/TermsAndConditionsPage";
import PrivacyPolicyPage from "@/page/client/PrivacyPolicyPage";
import FaqPage from "@/component/client/FaqPage";


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
            },
            {
                path: 'catalog/:id?',
                element: <CatalogPage/>
            },
            {
                path: 'catalogall',
                element: <CatalogAllPage/>
            },
            {
                path: 'termsandconditions',
                element: <TermsAndConditionsPage/>
            },
            {
                path: 'privacypolicy',
                element: <PrivacyPolicyPage/>
            },
            {
                path: 'faq',
                element: <FaqPage/>
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
            <Guard roles={['admin']}><AdminLayout/></Guard>,
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
            },
            {
                path: 'orders',
                element: <AdminOrdersPage />
            },
            {
                path: 'user',
                element: <AdminUsersPage />
            },
            {
                path: 'SendEmail/:_id?',
                element: <AdminSendEmailPage />
            }
        ],
    },
    {
        //préfixe de toutes des URL enfents 
        path: '/user/',
        //utilisation d'une mise en page
        element:
            <Guard roles={['user']}><BaseLayout/></Guard>,
         //référencer les pages utilisant la mise en page
        children:[
            {
                path: '',
                element: <ClientHomePage/>
            }
        ],
    },
]);
export default router;