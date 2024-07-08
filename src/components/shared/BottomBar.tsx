import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className=" sticky bottom-0 bg-white p-4 px-8 border-t lg:hidden">
      <ul className="flex justify-between">
        <li>
          <Link to={"/"} className="flex flex-col items-center gap-1 text-sm ">
            <AiFillHome className="text-xl" />
          </Link>
        </li>
        <li>
          <Link
            to={"/search"}
            className="flex flex-col items-center gap-1 text-sm "
          >
            <IoSearch className="text-xl" />
          </Link>
        </li>
        <li>
          <Link
            to={"/profile/wishlist"}
            className="flex flex-col items-center gap-1 text-sm "
          >
            <FaRegHeart className="text-xl" />
          </Link>
        </li>
        <li>
          <Link
            to={"/profile/orders"}
            className="flex flex-col items-center gap-1 text-sm "
          >
            <CgProfile className="text-xl" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BottomBar;
