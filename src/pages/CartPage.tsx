import CartItem from "@/components/shared/CartItem";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProducts } from "@/lib/api/api";
import useCartStore from "@/lib/stores/cartStore";
import { IProduct } from "@/types";
import QueryString from "qs";
import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems } = useCartStore();
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
    <div className="container flex flex-col gap-20 py-20 lg:flex-row">
      <div className="flex-1">
        <h2 className="text-lg font-semibold pb-5 mb-8 border-b">Your Cart</h2>
        <div className="flex flex-col gap-3">
          {cartItems.length < 1 && "No products in the cart"}
          {cartItems.map((item, index) => {
            const product: IProduct = products.find(
              (p: IProduct) => p.id === item.id
            );
            return (
              <React.Fragment key={index}>
                {isPending ? (
                  <Skeleton className="w-full h-20 mt-6" />
                ) : (
                  <CartItem
                    key={index}
                    id={item.id}
                    size={item.size}
                    color={item.color}
                    quantity={item.quantity}
                    productName={product?.attributes.title}
                    price={product?.attributes.price}
                    imageUrl={product?.attributes.images.data[0].attributes.url}
                    isPending={isPending}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="h-[430px]  bg-white rounded-lg p-6 lg:border lg:w-[340px] lg:mx-auto">
        <h2 className="text-lg font-semibold mb-10">Order Summary</h2>
        <div className="flex justify-between mb-4 text-sm font-medium">
          <span className=" text-neutral-black-500">Subtotal:</span>
          <span>${subtotals.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 text-sm font-medium">
          <span className=" text-neutral-black-500">Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between mb-6 text-sm font-medium">
          <span className=" text-neutral-black-500">Tax:</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <hr className="mb-6" />

        <div className="flex justify-between mb-9 text-sm font-medium">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <Link
          to={"/checkout"}
          className="block w-full  text-sm text-white text-center font-medium bg-neutral-black-900  py-3 rounded-md mb-6 duration-300 hover:bg-gray-800"
        >
          Checkout
        </Link>
        <Link
          to={"/search"}
          className="block w-full text-black text-xs text-center font-medium py-2 underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
