import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="navbar bg-amber-50 shadow-sm ">
            <div className="flex-1">
  <Link to={"/"} className="inline-block">
    <img 
      src="https://consumerhelpline.gov.in/public/assets/NCH-Logo.png" 
      alt="NCH Logo"
      className="w-auto pl-10" // adjust size as needed
    />
  </Link>
</div>


            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={"#profile"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={"#settings"}>Settings</Link></li>
                        <li><Link to={"#logout"}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
