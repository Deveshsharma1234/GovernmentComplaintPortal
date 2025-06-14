import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import EditProfile from "./components/EditProfile"; // Corrected typo
import GetMyComplaints from "./components/GetMyComplaints";
import RegisterComplaint from "./pages/RegisterComplaint";
import Admin from "./pages/admin/Admin";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminDashboardOverview from "./components/admin/AdminDashboardOverview";
import Users from "./components/admin/Users";
import AdminRegister from "./pages/admin/AdminRegister";
import GetAllComplaints from "./components/admin/GetAllComplaints";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home /> // Open to all
            },
            {
                path: "/register",
                element: <Register /> // Open to all
            },
            {
                path: "/login",
                element: <Login /> // Open to all
            },
            {
                path: "/about-us",
                element: <About /> // Open to all (assuming about us doesn't require login)
            },
            // Routes that require any logged-in user (roles 1, 2, 3, 4)
            {
                // This is a parent route for all user-specific protected routes
                // No specific 'allowedRoles' means only 'isLoggedIn' check applies
                path: "/", // Keep it at the root for common user-level protection
                element: <ProtectedRoute />, // Just check if logged in
                children: [
                    {
                        path: "/profile",
                        element: <Profile />
                    },
                    {
                        path: "/edit-profile",
                        element: <EditProfile />
                    },
                    {
                        path: "/getMyComplaints",
                        element: <GetMyComplaints />
                    },
                    {
                        path: "/registerComplaints",
                        element: <RegisterComplaint />
                    },
                ]
            },
            // Admin routes that require specific roles (1, 2, 3)
            {
                path: "/admin",
                element: <ProtectedRoute allowedRoles={[1, 2, 3]} />, // Only roles 1, 2, 3
                children: [
                    {
                        // The Admin component will be the layout for all admin sub-routes
                        element: <Admin />,
                        children: [
                            {
                                index: true,
                                element: <AdminWelcome />,
                            },
                            {
                                path: "dashboard",
                                element: <AdminDashboardOverview/>
                            },
                            {
                                path: "settings", // Admin specific settings or their profile, still protected by admin route
                                element: <Profile/>
                            },
                            {
                                path: "users",
                                element: <Users/>
                            },
                            {
                                path: "register", // Admin can register other admins/users
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
        ]
    }
]);

export default appRouter;