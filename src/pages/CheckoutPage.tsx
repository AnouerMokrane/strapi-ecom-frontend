import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import useCartStore from "@/lib/stores/cartStore";
import { useGetProducts } from "@/lib/api/api";
import QueryString from "qs";
import { IProduct } from "@/types";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPage = () => {
  const { cartItems } = useCartStore();
  const tax = 3;
  const filterIds = cartItems.map((item) => item.id);
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
    const product = products.find((p: IProduct) => p.id === curr.id);
    return acc + (product?.attributes.price || 0) * curr.quantity;
  }, 0);

  const total = subtotals + tax;

  return (
    <div className="container flex flex-col pt-16 pb-32 xl:flex-row md:gap-20">
      <div className="flex-1 max-w-xl bg-white rounded-lg">
        <h2 className=" font-semibold mb-10">Shipping Address</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="street-address"
              className="text-sm text-neutral-black-600 font-medium"
            >
              Street Address
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="city"
              className="text-sm text-neutral-black-600 font-medium"
            >
              City
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="state"
              className="text-sm text-neutral-black-600 font-medium"
            >
              State
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm text-neutral-black-600 font-medium"
            >
              Phone Number
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="county"
              className="text-sm text-neutral-black-600 font-medium"
            >
              Country
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm text-neutral-black-600 font-medium"
            >
              Email
            </label>
            <Input />
          </div>
          <div>
            <label
              htmlFor="full-name"
              className="text-sm text-neutral-black-600 font-medium"
            >
              Full name
            </label>
            <Input />
          </div>
        </form>
      </div>

      <div className="w-full bg-white r p-6 lg:border-l xl:w-[340px] md:pl-10 ">
        <h2 className="font-semibold mb-7">Your order</h2>
        <div className="flex flex-col overflow-auto max-h-48 bg-white">
          {cartItems.length < 1 && "No Orders"}
          {cartItems.map((item, index) => {
            const product: IProduct = products.find(
              (p: IProduct) => p.id === item.id
            );
            return (
              <React.Fragment key={index}>
                {isPending ? (
                  <Skeleton className="w-full h-24 mt-6" />
                ) : (
                  <div className=" flex items-center gap-3 text-xs mb-3 ">
                    <div className="w-14 h-14 bg-neutral-white-100 p-1">
                      <img
                        className="w-full h-full object-cover"
                        src={product.attributes.images.data[0].attributes.url}
                        alt=""
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className=" font-medium">
                        {product.attributes.title}{" "}
                      </h4>
                      <div className=" text-neutral-black-500">
                        <span>{item?.color} </span>|<span> {item?.size} </span>
                      </div>
                      <span className=" text-neutral-black-500">
                        quantity: {item?.quantity}{" "}
                      </span>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex mb-7">
          {cartItems.length < 0 && (
            <Link
              to={"/cart"}
              className="block text-sm text-neutral-black-500 font-medium py-1.5 px-4 ms-auto border border-neutral-black-200 rounded-sm"
            >
              Edit cart
            </Link>
          )}
        </div>
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
          Place Order
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
