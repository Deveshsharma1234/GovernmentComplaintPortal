import {createBrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/profile";
import EditProflile from "./components/EditProfile"



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
            },
            {
                path: "/login",
                element: <Login/>
            }
            ,{
                path: "/about-us",
                element: <About/>
            },{
                path: "/profile",
                element: <Profile/>
            },{
                path: "edit-profile",
                element: <EditProflile/>
            }

        ]

    }
])

export default appRouter;