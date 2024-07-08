import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center flex-col justify-center my-48">
      <MdError className={"text-7xl text-yellow-400 mb-6"} />
      <h1 className="text-5xl font-bold mb-4">404 Not Found</h1>
      <p>This page does not exist</p>
      <button className="text-sm text-white p-2 mt-5 bg-neutral-black-900 rounded-sm ">
        <Link to={"/"}>Go Back</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
