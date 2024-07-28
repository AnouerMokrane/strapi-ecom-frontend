import { useDeleteWishlist } from "@/lib/api/api";
import { IProduct } from "@/types";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const formattedDate = `${day} ${month} ${date.getFullYear()}`;
  return formattedDate;
}

type WishlistItemProps = {
  product: IProduct;
  wishlistId: number;
  addedDate: Date;
};

const WishlistItem = ({
  product,
  wishlistId,
  addedDate,
}: WishlistItemProps) => {
  const { mutateAsync: deleteItem } = useDeleteWishlist();
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteItem(id);
      if (res.statusText === "OK") {
        toast.success("Product removed from wishlist!");
      }
    } catch (error) {
      toast.warn("failed to remove from wishlist");
    }
  };
  return (
    <div key={product.id} className="flex  md:flex-row items-center gap-4">
      <div className="w-20 h-20 bg-neutral-white-100 rounded-sm overflow-hidden">
        <img
          src={product?.attributes?.images?.data[0]?.attributes?.url || ""}
          alt={product?.attributes?.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-1 md:gap-2">
        <div className="flex gap-1 items-center">
          <h3 className="text-sm font-medium">{product?.attributes?.title}</h3>

          <button
            onClick={() => handleDelete(wishlistId)}
            className="w-5 h-5 flex justify-center items-center text-xs font-medium text-neutral-black-900 bg-red-500 ml-auto "
          >
            <GrClose className="text-white" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {" "}
            <span className="text-sm font-medium">
              ${product?.attributes?.price.toFixed(2)}
            </span>
            <span className="text-xs text-neutral-black-500 mt-1">
              {formatDate(addedDate)}
            </span>
          </div>
          <Link
            to={`/search/${encodeURIComponent(product?.attributes?.title)}`}
            className="text-xs text-neutral-black-800 border border-neutral-black-900 px-2 py-2 rounded-sm"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
