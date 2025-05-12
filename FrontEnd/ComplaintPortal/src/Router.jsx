import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                index: true,
                element :<Home/>
            },
            {
                path: "/register",
                element: <Register/>
            }

        ]

    }
])

export default appRouter;