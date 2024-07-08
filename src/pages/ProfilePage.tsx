import { useAuth } from "@/lib/stores/authStore";
import { NavLink, Outlet } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import { AiOutlineUser } from "react-icons/ai";

const ProfilePage = () => {
  const { logout } = useAuth();

  const activeClassName = "text-neutral-black-900 bg-neutral-white-100";
  return (
    <div className="container flex flex-col my-16 md:flex-row py-20">
      <aside className=" mx-auto pb-5 border-b md:w-52 md:py-20 md:mr-8 md:border-0">
        <nav>
          <ul className="flex flex-row items-center gap-4 md:flex-col md:items-stretch">
            <li>
              <NavLink
                to="wishlist"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium text-neutral-black-500 p-2 rounded-md hover:text-neutral-black-900 hover:bg-neutral-white-100 md:p-[10px] md:px-6 ${
                    isActive ? activeClassName : ""
                  }`
                }
              >
                <FaRegHeart className="text-lg" />
                <span className="hidden md:block">Wishlist</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="address"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium text-neutral-black-500 p-2 rounded-md hover:text-neutral-black-900 hover:bg-neutral-white-100 md:p-[10px] md:px-6 ${
                    isActive ? activeClassName : ""
                  }`
                }
              >
                <FaShippingFast className="text-lg" />
                <span className="hidden md:block">Address</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="password"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium text-neutral-black-500 p-2 rounded-md hover:text-neutral-black-900 hover:bg-neutral-white-100 md:p-[10px] md:px-6 ${
                    isActive ? activeClassName : ""
                  }`
                }
              >
                <TfiKey className="text-lg" />
                <span className="hidden md:block">Password</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="account-detail"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium text-neutral-black-500 p-2 rounded-md hover:text-neutral-black-900 hover:bg-neutral-white-100 md:p-[10px] md:px-6 ${
                    isActive ? activeClassName : ""
                  }`
                }
              >
                <AiOutlineUser className="text-lg" />
                <span className="hidden md:block">Account Detail</span>
              </NavLink>
            </li>
            <li>
              <button
                className="flex items-center gap-2 px-2 text-sm  text-neutral-black-500 font-medium  md:px-6"
                onClick={logout}
              >
                <CiLogin className="text-lg" />
                <span className="hidden md:block">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="relative  p-4 md:pl-16 md:w-3/4">
        <div className="absolute top-0 left-4 hidden w-[1px] h-[423px] bg-neutral-white-200 md:block " />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
