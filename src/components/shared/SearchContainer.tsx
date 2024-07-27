import React from "react";
import { IProduct } from "@/types";
import SearchItem from "./SearchItem";
import { IoMdClose } from "react-icons/io";
import { Skeleton } from "../ui/skeleton";
import { useDebounce } from "@uidotdev/usehooks";
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
  const debouncedSearch = useDebounce(searchValue, 800);

  const searchQuery = debouncedSearch
    ? `/products?populate=*&filters[title][$containsi]=${debouncedSearch}&pagination[page]=1&pagination[pageSize]=4`
    : null;

  const { data: products, isPending } = useGetProducts(searchQuery ?? "");

  const handleClose = () => {
    setOpenOverLay(false);
    setOpenSearchContainer(false);
  };

  return (
    <div className="w-[135%] max-h-96 flex flex-col gap-2 absolute top-full mt-2 bg-white p-4 rounded-md shadow-lg z-[200] overflow-y-auto">
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 p-1 bg-neutral-white-200 z-50 hover:bg-gray-200"
      >
        <IoMdClose />
      </button>

      {debouncedSearch ? (
        isPending ? (
          <Skeleton className="w-full h-16 mt-4" />
        ) : products?.data && products.data.length > 0 ? (
          products.data.map((product: IProduct) => (
            <SearchItem
              key={product.id}
              name={product.attributes.title}
              price={product.attributes.price}
              imageUrl={product.attributes.images.data[0].attributes.url}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No items found</p>
        )
      ) : (
        <p className="text-sm text-neutral-black-500 font-medium">
          Start typing to search...
        </p>
      )}
    </div>
  );
};

export default SearchContainer;
