import { Link } from 'react-router-dom';
import { BsGrid1X2Fill, BsBookHalf, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBook } from 'react-icons/bs';
import { RiAdminFill } from "react-icons/ri";
import {useDispatch} from 'react-redux';
import {toggleSideBar } from '../../redux/slice/toggleSideBarSlice';
import { useSelector } from 'react-redux';
import { IoInformation } from 'react-icons/io5';
import { RiCloseCircleFill } from "react-icons/ri";


const SideBar = () => {
const isOpen = useSelector(store => store.toggleSideBar.isOpen)
const dispatch = useDispatch()
const toggleSidebar = () => dispatch(toggleSideBar())

    return (
     <aside

  className={`bg-base-200   h-screen left-0 z-50 transition-all duration-300 ${
    isOpen ? 'w-70' : 'w-7'
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
         <RiCloseCircleFill className="text-2xl text-gray-500 hover:text-red-700 hover:drop-shadow-[0_0_6px_rgba(185,28,28,0.8)] transition duration-300 cursor-pointer" />

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
          <Link to="/admin/complaints" className="flex items-center gap-2">
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
