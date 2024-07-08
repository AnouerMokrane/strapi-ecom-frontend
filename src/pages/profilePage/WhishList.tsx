import WishlistItem from "@/components/shared/WishlistItem";
import { useGetWhishlist } from "@/lib/api/api";
import { useAuth } from "@/lib/stores/authStore";

const WhishList = () => {
  const { user } = useAuth();
  const { data, isPending } = useGetWhishlist(user?.email as string);
  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-4">Wishlist</h1>
      <div className="flex  flex-col gap-5 divide-y-1 mt-8 max-w-lg">
        {data?.data.map((w) => (
          <WishlistItem
            key={w.id}
            product={w?.attributes?.product.data}
            wishlistId={w?.id}
            addedDate={w.attributes.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default WhishList;
