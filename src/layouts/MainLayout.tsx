import BottomBar from "@/components/shared/BottomBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import NotificationBar from "@/components/shared/NotificationBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <NotificationBar />
      <Header />
      <BreadCrumb />
      <main className=" min-h-[50vh] overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </div>
  );
};

export default MainLayout;
