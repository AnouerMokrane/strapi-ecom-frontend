import { Skeleton } from "@/components/ui/skeleton";
import { useGetProducts } from "@/lib/api/api";
import useCartStore from "@/lib/stores/cartStore";
import { IProduct } from "@/types";
import QueryString from "qs";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    openCart,
    setOpenCart,
  } = useCartStore();
  const filterIds = cartItems.map((item) => item.id);
  const tax = 3;
  const query = QueryString.stringify({
    filters: {
      id: {
        $in: filterIds,
      },
    },
  });

  const { data, isPending } = useGetProducts(`/products?populate=*&${query}`);
  const products = data?.data || [];
  const subtotals = cartItems.reduce((acc, curr) => {
    const product = products.find((p) => p.id === curr.id);
    return acc + (product?.attributes.price || 0) * curr.quantity;
  }, 0);
  const total = subtotals + tax;
  return (
    <div
      className={`flex flex-col fixed top-0 w-[350px] h-screen bg-white z-[99999999] shadow-lg pt-24 pb-12 px-4 duration-500 ${
        openCart ? "right-0" : "-right-full"
      }`}
    >
      <div className=" absolute top-0 left-0 py-4 px-3 w-full flex justify-between items-center bg-neutral-white-100">
        <h4 className="text-neutral-black-900 font-semibold">Shopping Cart</h4>
        <button
          className="text-2xl text-neutral-black-500 p-1"
          onClick={() => setOpenCart(false)}
        >
          <IoMdClose />
        </button>
      </div>
      {cartItems.length < 1 && "No products in the cart"}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto py-6">
        {cartItems.map((item, index) => {
          const product: IProduct = products.find(
            (p: IProduct) => p.id === item.id
          );
          return (
            <React.Fragment key={index}>
              {isPending ? (
                <Skeleton className="w-full h-20 mt-6" />
              ) : (
                <div>
                  <div key={index} className="flex items-center gap-4 ">
                    <div className="relative flex justify-center items-center w-20 h-20 bg-neutral-white-100 rounded-sm overflow-hidden">
                      <img
                        src={
                          import.meta.env.VITE_APP_URL +
                          product?.attributes.images.data[0].attributes.url
                        }
                        width={55}
                        height={67}
                        alt={product?.attributes.title}
                        className="object-cover mix-blend-darken"
                      />
                      <button
                        onClick={() =>
                          removeFromCart(item.id, item.size, item.color)
                        }
                        className=" absolute top-0 right-0 bg-neutral-white-200 p-1"
                      >
                        <IoMdClose />
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col items-start gap-2 ">
                      <div className="flex gap-2">
                        <h3 className="text-sm font-medium">
                          {product?.attributes.title}{" "}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 ">
                          <span
                            className="w-3 h-3 rounded-full mr-1 bg-green-400"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="mx-2">|</span>
                          <div className="flex gap-1 text-xs text-neutral-black-500 font-medium">
                            {item.size || "M"}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row-reverse gap-2  items-center  ">
                        <span className=" text-sm font-medium sm:mr-8">
                          ${product?.attributes.price?.toFixed(2)}{" "}
                        </span>
                        <div className=" w-28 h-10 flex justify-between items-center py-1 px-3 border rounded-sm">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id, item.size, item.color)
                            }
                            className="text-xs text-neutral-black-500"
                          >
                            <FaMinus />
                          </button>
                          <span className=" text-neutral-black-500 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                size: item.size,
                                color: item.color,
                                quantity: item.quantity + 1,
                              });
                            }}
                            className="text-xs text-neutral-black-500  "
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.size, item.color)
                          }
                          className="hidden w-10 h-10  justify-center items-center ml-4 text-lg text-neutral-black-500 bg-neutral-white-100 rounded-sm focus:outline-none"
                        >
                          <IoMdClose />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="py-8 border-t">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-neutral-black-900">
            Total:
          </span>
          <span className="text-sm font-medium text-neutral-black-900">
            ${cartItems.length ? total.toFixed(2) : (0).toFixed(2)}
          </span>
        </div>
        <Link
          to={"cart"}
          className="w-full block p-3 mt-6 text-center text-sm text-white font-medium bg-neutral-black-900"
        >
          View Cart
        </Link>
        <Link
          to={"checkout"}
          className="w-full block p-3 mt-2 text-center text-xs text-neutral-black-500 font-medium  underline"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
