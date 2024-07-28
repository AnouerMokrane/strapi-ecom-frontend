import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/lib/stores/authStore";

const AuthLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile/wishlist");
    }
  }, [user, navigate]);

  return <>{!user && <Outlet />}</>;
};

export default AuthLayout;
