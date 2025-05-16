import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsBookHalf, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBook } from 'react-icons/bs';
import { RiAdminFill } from "react-icons/ri";
import {useDispatch} from 'react-redux';
import {toggleSideBar } from '../../redux/slice/toggleSideBarSlice';
import { useSelector } from 'react-redux';
import { IoInformation } from 'react-icons/io5';



const SideBar = () => {
const isOpen = useSelector(store => store.toggleSideBar.isOpen)
const dispatch = useDispatch()
const toggleSidebar = () => dispatch(toggleSideBar())

    return (
     <aside

  className={`bg-base-200   h-screen left-0 z-50 transition-all duration-300 ${
    isOpen ? 'w-64' : 'w-3'
  }`}
>
  {/* Show only handle when closed */}
  {!isOpen && (
    <div
      className="h-full flex items-center justify-center cursor-pointer bg-primary text-white"
      onClick={toggleSidebar}
    >
      ❯
    </div>
  )}

  {/* Full sidebar when open */}
  {isOpen && (
    <div className="flex flex-col h-full w-70">
      <div className="flex justify-between items-center px-4 py-4 border-b border-base-300">
        <div className="text-xl font-bold flex items-center gap-2">
          <RiAdminFill className="text-primary text-2xl" />
          Complaint Portal
        </div>
        <button className="btn btn-sm btn-ghost" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      <ul className="menu p-4 text-base-content">
        <li>
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <BsGrid1X2Fill className="text-lg" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="#Books" className="flex items-center gap-2">
            <BsBookHalf className="text-lg" />
            Complaints
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="flex items-center gap-2">
            <BsPeopleFill className="text-lg" />
            Users
          </Link>
        </li>
      
        <li>
          <Link to="#review" className="flex items-center gap-2">
            <BsMenuButtonWideFill className="text-lg" />
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/admin/settings" className="flex items-center gap-2">
            <BsFillGearFill className="text-lg" />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  )}
</aside>



    );
}

export default SideBar;
