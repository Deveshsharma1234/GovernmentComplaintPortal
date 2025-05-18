import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { SiAboutdotme } from "react-icons/si";
import { BiSolidLogIn } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import useLogout from "../hooks/useLogout";
import { ToastContainer } from "react-toastify";
import {ROLE_MAP as roleMap} from '../utils/constants';




const Header = () => {
    const isLoggedId = useSelector(store => store.user.isLoggedIn)
    const user = useSelector(store => store.user.user)
    const logout = useLogout();

    const handleLogout = () => {
        logout();
    }

 

    return (
        <div className="navbar bg-amber-50 shadow-sm ">
            <ToastContainer />
            <div className="flex-1">
                <Link to={"/"} className="inline-block">
                    <img
                        src="https://consumerhelpline.gov.in/public/assets/NCH-Logo.png"
                        alt="NCH Logo"
                        className="w-auto pl-10" // adjust size as needed
                    />
                </Link>
            </div>


            <div className="flex gap-4 items-center justify-center">
                <Link to="/">
                    <MdHomeFilled className="size-10 text-purple-600" />
                </Link>

                <Link to="/about-us">
                    <h1 className="bg-purple-600 rounded-2xl w-40 h-10 flex items-center justify-center text-white font-medium">About-Us</h1>
                </Link>
                <a
                    href="https://consumeraffairs.nic.in/latest-updates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 rounded-2xl w-40 h-10 flex items-center justify-center text-white font-medium"
                >
                    Knowledge Base
                </a>
                {roleMap[user?.RoleId] && user.RoleId!==4 ?(
                    <Link className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-lg hover:bg-red-950 transition" to={"/admin"}>
                        {roleMap[user?.RoleId]?.text}
                    </Link>
                ):( isLoggedId && <Link to={"/profile"} className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 rounded-lg hover:bg-red-950 transition" >
                    
                        { "Hello "+ user?.FirstName}
                    </Link>)
                    
                    }

                <div>
                    {isLoggedId ? (
                        <Link
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            <IoLogOut className="size-6" />
                            Logout
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            <BiSolidLogIn className="size-6" />
                            Login
                        </Link>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Header;
