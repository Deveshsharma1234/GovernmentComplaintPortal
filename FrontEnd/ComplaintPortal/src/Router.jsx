import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Register from "./pages/Register";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                index: true,
                element :<Login/>
            },
            {
                path: "/register",
                element: <Register/>
            }

        ]

    }
])

export default appRouter;