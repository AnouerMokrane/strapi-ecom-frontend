import { RouteObject } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/CantactPage";
import PrivateLayout from "./layouts/PrivateLayout";
import WhishList from "./pages/profilePage/WhishList";
import Address from "./pages/profilePage/Address";
import Password from "./pages/profilePage/Password";
import AccountDetail from "./pages/profilePage/AccountDetail";
import ResetPassword from "./pages/profilePage/ResetPassword";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "/search/:slug",
        element: <ProductDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },

      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
          {
            path: "forgot-password",
            element: <ResetPassword />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
            children: [
              {
                path: "wishlist",
                element: <WhishList />,
              },
              {
                path: "address",
                element: <Address />,
              },
              {
                path: "password",
                element: <Password />,
              },
              {
                path: "account-detail",
                element: <AccountDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
