import FilterSidebar from "@/components/shared/FilterSidebar";
import NewsletterSection from "@/components/shared/HomePage/NewsletterSection";
import ProductCard from "@/components/shared/ProductCard";
import { useGetCategories, useGetProducts } from "@/lib/api/api";
import { ICategory, IProduct } from "@/types";
import { MdKeyboardArrowUp } from "react-icons/md";
import qs from "qs";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/stores/store";
import { useLocation } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { motion } from "framer-motion";

const SearchPage = () => {
  const { selectedCategories, selectedColors, selectedSizes, priceRange } =
    useStore();
  const [filter, setFilter] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [sort, SetSort] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const { data: categories } = useGetCategories();

  useEffect(() => {
    if (!categories) return;

    const cat = categories.data.find(
      (cat: ICategory) => cat.attributes.title === category
    );

    const query = qs.stringify({
      filters: {
        categories: {
          $in:
            selectedCategories.length > 0
              ? selectedCategories
              : cat
              ? [cat.id]
              : [],
        },
        colors: {
          $in: selectedColors,
        },
        sizes: {
          $in: selectedSizes,
        },
        price: {
          $gte: 10,
          $lte: priceRange,
        },
      },
      sort: sort,
    });

    setFilter(`/products?populate=*&${query}`);
  }, [
    selectedCategories,
    selectedColors,
    selectedSizes,
    priceRange,
    sort,
    category,
    categories,
  ]);

  const { data: products, isLoading, error } = useGetProducts(filter);
  const { data: allProducts } = useGetProducts("/products?populate=*");

  return (
    <div className=" mt-16">
      <div className="container flex gap-6 pb-14">
        <FilterSidebar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />

        <div className="flex-1 py-4">
          {products?.data.length <= 0 ? null : (
            <div className="flex justify-between items-center">
              <p className="flex-1 text-xs text-neutral-black-500 font-medium">
                Showing 1-{products?.data.length} Of {allProducts?.data.length}{" "}
                results.
              </p>
              <button
                className="mr-3 md:hidden"
                onClick={() => setOpenSidebar(true)}
              >
                <IoFilter />
              </button>
              <div className="group relative cursor-pointer">
                <div className="flex items-center gap-2 text-xs text-neutral-black-500 font-medium">
                  SORT BY
                  <MdKeyboardArrowUp className="text-xl" />
                </div>
                <div className="hidden w-28 absolute top-5 -left-1/2 bg-white border rounded-sm py-2 z-50 space-y-1 group-hover:block ">
                  <button
                    onClick={() => {
                      SetSort("title");
                    }}
                    className="w-full -sm px-2 py-1 text-sm text-left duration-300 hover:bg-neutral-white-100"
                  >
                    Name
                  </button>
                  <button
                    onClick={() => {
                      SetSort("price");
                    }}
                    className="w-full -sm px-2 py-1 text-sm text-left duration-300 hover:bg-neutral-white-100"
                  >
                    Price
                  </button>
                </div>
              </div>
            </div>
          )}

          {products?.data.length <= 0 ? (
            <div className="flex justify-center mt-12">
              <div>
                <img
                  src="./assets/empty-state.png"
                  alt=""
                  className="mx-auto"
                />
                <p className="text-sm">No products matched your filters.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-2 gap-y-10 mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error loading products</p>
              ) : (
                products?.data.map((product: IProduct) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.3 },
                    }}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
};

export default SearchPage;
