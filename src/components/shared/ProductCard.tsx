import { useAddWishlist, useGetWhishlist } from "@/lib/api/api";
import { useAuth } from "@/lib/stores/authStore";
import { IProduct } from "@/types";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type ProductProps = {
  product: IProduct;
};

const ProductCard = ({ product }: ProductProps) => {
  const { user } = useAuth();
  const { data } = useGetWhishlist(user?.email as string);
  const { mutateAsync: addToWishlist } = useAddWishlist();

  const isProductExist = data?.data.find(
    (w: any) => w.attributes.product.data.id === product.id
  );

  const handleAddToWishlist = async () => {
    if (!isProductExist) {
      const data = {
        data: {
          username: user?.username,
          email: user?.email,
          product: product.id,
        },
      };
      try {
        const res = await addToWishlist(data);

        if (!res) {
          toast.warn("Failed to add to wishlist");
        } else {
          toast.success("Product added to wishlist!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warn("This product is already in your wishlist!");
    }
  };

  return (
    <Link
      to={`/search/${product?.attributes.title}`}
      className="group relative block overflow-hidden max-w-[320px]"
    >
      <button
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          if (!user) {
            toast.warn("You must sign in first");
          } else {
            handleAddToWishlist();
          }
        }}
        className="absolute p-2 bg-white rounded-full -top-10 right-2 duration-300 group-hover:top-2"
      >
        <BsHeart />
      </button>
      <div className="w-full h-[312px] p-4 bg-neutral-white-100 rounded-md">
        <img
          src={`${product?.attributes.images.data[0].attributes.url}`}
          alt=""
          className="w-full h-full object-cover mix-blend-darken"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-sm font-medium mb-3">
          {product?.attributes.title}
        </h2>
        <div className="flex items-center gap-3">
          <span className=" text-xs font-medium mr-2 px-4 py-1.5 border rounded-full">
            {product?.attributes.stock <= 0 ? "OUT OF STOCK" : "IN STOCK"}
          </span>
          <p className="text-sm text-neutral-black-500 font-medium">
            ${product?.attributes.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
