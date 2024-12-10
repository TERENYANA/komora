import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/HomePage";
import ContactPage from "../page/ContactPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/contact',
        element: <ContactPage />
    },
]);
export default router;