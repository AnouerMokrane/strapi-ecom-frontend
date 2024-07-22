import { IProduct } from "@/types";
import SearchItem from "./SearchItem";
import { IoMdClose } from "react-icons/io";
import { Skeleton } from "../ui/skeleton";
import { useGetProducts } from "@/lib/api/api";

type SearchContainerProps = {
  setOpenSearchContainer: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOverLay: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string | null;
};

const SearchContainer = ({
  setOpenSearchContainer,
  setOpenOverLay,
  searchValue,
}: SearchContainerProps) => {
  const { data: products, isPending } = useGetProducts(
    `/products?populate=*&filters[title][$contains]=${searchValue}`
  );

  const skeletonCount = 4;

  return (
    <div className="w-[135%] flex flex-col gap-2 absolute top-full mt-2 bg-white p-4 rounded-md shadow-lg z-[200]">
      <button
        onClick={() => {
          setOpenOverLay(false);
          setOpenSearchContainer(false);
        }}
        className="absolute top-0 right-0 p-1 bg-neutral-white-200 z-50"
      >
        <IoMdClose />
      </button>

      {isPending ? (
        <>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton key={index} className="w-full h-16" />
          ))}
        </>
      ) : products.data.length <= 0 ? (
        "no items found"
      ) : (
        products?.data.map((product: IProduct) => (
          <SearchItem
            key={product?.id}
            name={product?.attributes.title}
            price={product?.attributes.price}
            imageUrl={product.attributes.images.data[0].attributes.url}
          />
        ))
      )}

      {products?.data.length > 0 && (
        <button className="text-sm text-neutral-black-700 pt-2 underline">
          Load more...
        </button>
      )}
    </div>
  );
};

export default SearchContainer;
