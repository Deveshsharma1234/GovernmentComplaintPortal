import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import EditProflile from "./components/EditProfile"
import GetMyComplaints from "./components/GetMyComplaints";
import RegisterComplaint from "./pages/RegisterComplaint";
import Admin from "./pages/admin/Admin";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminDashboardOverview from "./components/admin/AdminDashboardOverview";
import Users from "./components/admin/Users";
import AdminRegister from "./pages/admin/AdminRegister";
import GetAllComplaints from "./components/admin/GetAllComplaints";



const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
            , {
                path: "/about-us",
                element: <About />
            }, {
                path: "/profile",
                element: <Profile />
            }, {
                path: "/edit-profile",
                element: <EditProflile />
            }, {
                path: "/getMyComplaints",
                element: <GetMyComplaints />
            },
            {
                path: "/registerComplaints",
                element: <RegisterComplaint />
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        index: true, // this makes it default route for /admin
                        element: <AdminWelcome />,
                    },
                    {
                        path: "dashboard",
                        element: <AdminDashboardOverview/>
                    },
                    {
                        path: "settings",
                        element: <Profile/>
                    },
                    {
                        path: "users",
                        element: <Users/>
                    },
                    {
                        path: "register",
                        element: <AdminRegister/>
                    },
                    {
                        path: "complaints",
                        element: <GetAllComplaints/>
                    }


                ]
            }

        ]

    }
])

export default appRouter;