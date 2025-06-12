import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { PiInfoBold } from "react-icons/pi";
import { BiSolidLogIn } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { IoLogOut } from "react-icons/io5";
import useLogout from "../hooks/useLogout";
import { ToastContainer } from "react-toastify";
import { ROLE_MAP as roleMap } from '../utils/constants';

const Header = () => {
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const user = useSelector(store => store.user.user);
    const logout = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="navbar bg-gradient-to-r from-amber-100 to-amber-50 shadow-md">
            <ToastContainer />
            <div className="flex-1">
                <Link to={"/"} className="inline-block">
                    <img
                        src="https://consumerhelpline.gov.in/public/assets/NCH-Logo.png"
                        alt="NCH Logo"
                        className="h-12 pl-6" // Adjusted size for better balance
                    />
                </Link>
            </div>

            <div className="flex gap-3 items-center justify-center pr-6">
                <Link to="/">
                    <MdHomeFilled className="size-8 text-indigo-600 hover:text-indigo-700 transition-colors" />
                </Link>

                <Link to="/about-us">
                    <div className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                        {/* <SiAboutdotme className="size-5" /> */}
                        <PiInfoBold></PiInfoBold>
                        <span className="font-medium">About Us</span>
                    </div>
                </Link>

                <a
                    href="https://consumeraffairs.nic.in/latest-updates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                    <span className="font-medium">Knowledge Base</span>
                </a>

                {roleMap[user?.RoleId] && user.RoleId !== 4 ? (
                    <Link
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
                        to={"/admin"}
                    >
                        {/* <SiAboutdotme className="size-5" /> */}
                        <MdOutlineAdminPanelSettings/>
                        <span className="font-medium">{roleMap[user?.RoleId]?.text}</span>
                    </Link>
                ) : (
                    isLoggedIn && (
                        <Link
                            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
                            to={"/profile"}
                        >
                            <FaRegUser />
                            <span className="font-medium">Hello, {user?.FirstName}</span>
                        </Link>
                    )
                )}

                <div>
                    {isLoggedIn ? (
                        <Link
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <IoLogOut className="size-5" />
                            <span className="font-medium">Logout</span>
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            <BiSolidLogIn className="size-5" />
                            <span className="font-medium">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;