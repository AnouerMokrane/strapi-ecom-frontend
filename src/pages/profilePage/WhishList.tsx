import WishlistItem from "@/components/shared/WishlistItem";
import { useGetWhishlist } from "@/lib/api/api";
import { useAuth } from "@/lib/stores/authStore";
import { IWishlistItem } from "@/types";

const WhishList = () => {
  const { user } = useAuth();
  const userEmail = user && user.email;
  const { data, isPending, error } = useGetWhishlist(userEmail as string);
  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-4">Wishlist</h1>
      <div className="flex  flex-col gap-5 divide-y-1 mt-8 max-w-lg">
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data?.data.map((w: IWishlistItem) => (
            <WishlistItem
              key={w.id}
              product={w?.attributes?.product.data}
              wishlistId={w?.id}
              addedDate={w.attributes.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WhishList;
