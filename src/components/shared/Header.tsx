import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "../ui/input";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import OverLay from "./OverLay";
import { useGetCategories } from "@/lib/api/api";
import { ICategory } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import SearchContainer from "./SearchContainer";
import Cart from "./Cart";
import useCartStore from "@/lib/stores/cartStore";

const Header = () => {
  const { setOpenCart } = useCartStore();
  const [openOverLay, setOpenOverLay] = useState(false);
  const [openSearchContainer, setOpenSearchContainer] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const { data: categories, isPending } = useGetCategories();
  const skeletonCount = 4;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <header className="relative container flex justify-between items-center my-5">
      <Link to={"/"}>
        <img
          src="/assets/logo.svg"
          width={160}
          height={40}
          alt="Ecommerce Logo"
        />
      </Link>

      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink to="/" className={navigationMenuTriggerStyle()}>
              Home
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="py-4 md:w-[150px] max-h-fit space-y-2">
                {isPending
                  ? Array.from({ length: skeletonCount }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-[90%] h-[20px] rounded-sm mx-auto"
                      />
                    ))
                  : categories?.data.map((category: ICategory) => (
                      <li key={category.id}>
                        <Link
                          to={`/search?category=${category.attributes.title}`}
                          className="block w-full px-4 py-1 text-sm duration-300 hover:bg-gray-100 capitalize"
                        >
                          {category.attributes.title}
                        </Link>
                      </li>
                    ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/about" className={navigationMenuTriggerStyle()}>
              About
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink to="/contact" className={navigationMenuTriggerStyle()}>
              Contact
            </NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-6 text-gray-500">
        <div className="w-64 relative hidden lg:block z-[1000]">
          <Input
            placeholder="Search products"
            className={`w-full h-11 ps-10 py-5 focus-within:outline-none ${
              (openOverLay || openSearchContainer) && "w-[135%]"
            }`}
            onChange={handleChange}
            onFocus={() => {
              setOpenOverLay(true);
              setOpenSearchContainer(true);
            }}
          />
          <CiSearch className="text-2xl absolute left-3 top-1/2 -translate-y-1/2" />
          {openSearchContainer && (
            <SearchContainer
              setOpenSearchContainer={setOpenSearchContainer}
              setOpenOverLay={setOpenOverLay}
              searchValue={searchValue}
            />
          )}
        </div>

        <button onClick={() => setOpenCart(true)}>
          <LuShoppingCart className="text-xl" />
        </button>
        <Link to={"profile/wishlist"} className="hidden lg:block">
          <FaRegCircleUser className="text-xl font-light" />
        </Link>
      </div>
      {openOverLay && <OverLay />}
      <Cart />
    </header>
  );
};

export default Header;
