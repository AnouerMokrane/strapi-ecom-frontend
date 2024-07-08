import { Link } from "react-router-dom";

const NotificationBar = () => {
  return (
    <div className="hidden  justify-center items-center gap-3 bg-neutral-black-900 text-center text-white py-3 lg:flex">
      <p className="text-sm">Get 25% OFF on your first order.</p>
      <Link to={"/search"} className="text-sm underline font-medium">
        Order Now
      </Link>
    </div>
  );
};

export default NotificationBar;
