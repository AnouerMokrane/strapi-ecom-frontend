import useCartStore from "@/lib/stores/cartStore";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type CartItemProps = {
  id: number;
  imageUrl: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  isPending: boolean;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  productName,
  color,
  size,
  price,
  quantity,
}) => {
  const { removeFromCart, addToCart, decreaseQuantity } = useCartStore();

  return (
    <div className="flex items-center gap-4 md:p-4">
      <div className="relative flex justify-center items-center w-24 h-20 bg-neutral-white-100 rounded-sm">
        <img
          src={import.meta.env.VITE_APP_URL + imageUrl}
          alt={productName}
          className=" w-[80%] h-[80%]  object-cover "
        />
        <button
          onClick={() => removeFromCart(id, size, color)}
          className=" absolute top-0 right-0 bg-neutral-white-200 p-1 sm:hidden"
        >
          <IoMdClose />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
        <div className="flex gap-2 sm:flex-col">
          <h3 className="text-sm font-semibold">{productName} </h3>
          <div className="flex items-center text-sm text-gray-600 sm:mt-1">
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-neutral-black-500 font-medium sm:block">
                Color:{" "}
              </span>
              <span
                className="w-3 h-3 rounded-full mr-1 bg-green-400"
                style={{ backgroundColor: color }}
              ></span>
            </div>
            <span className="mx-2">|</span>
            <div className="flex gap-1 text-xs text-neutral-black-500 font-medium">
              <span className="hidden sm:block">Size:</span> {size || "M"}
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-2  items-center sm:flex-row sm:gap-0 ">
          <span className=" text-sm font-medium sm:mr-8">
            ${price?.toFixed(2)}{" "}
          </span>
          <div className=" w-28 h-10 flex justify-between items-center py-1 px-3 border rounded-sm">
            <button
              onClick={() => decreaseQuantity(id, size, color)}
              className="text-xs text-neutral-black-500"
            >
              <FaMinus />
            </button>
            <span className=" text-neutral-black-500 font-medium">
              {quantity}
            </span>
            <button
              onClick={() => {
                addToCart({
                  id,
                  size,
                  color,
                  quantity: quantity + 1,
                });
              }}
              className="text-xs text-neutral-black-500  "
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(id, size, color)}
            className="hidden w-10 h-10  justify-center items-center ml-4 text-lg text-neutral-black-500 bg-neutral-white-100 rounded-sm focus:outline-none sm:flex"
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
