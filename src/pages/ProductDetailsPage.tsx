import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "@/components/shared/ProductCard";
import NewsletterSection from "@/components/shared/HomePage/NewsletterSection";
import { useParams } from "react-router-dom";
import {
  useAddWishlist,
  useGetProduct,
  useGetProducts,
  useGetWhishlist,
} from "@/lib/api/api";
import useCartStore from "@/lib/stores/cartStore";
import { IColor, IProduct, ISize } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/stores/authStore";
import { toast } from "react-toastify";
import ShareLink from "@/components/ShareLink";

const ProductDetailsPage = () => {
  const skeletonCount = 3;
  const { slug } = useParams();
  const [openShareOverlay, SetOpenShareOverlay] = useState(false);
  const {
    data: product,
    isPending,
    isError,
    error,
  } = useGetProduct(slug as string);
  const { user } = useAuth();
  const { addToCart, setOpenCart } = useCartStore();
  const [quantity, SetQuantity] = useState(1);
  const [selectedSize, SetSelectedSize] = useState("");
  const [selectedColor, SetSelectedColor] = useState("");
  const id = product?.data[0].id;
  const prodcutType = product?.data[0].attributes.productType;
  const { data: similarProducts } = useGetProducts(
    `/products?populate=*&filters[productType][$eq]=${prodcutType}&filters[id][$not]=${id}`
  );
  const { mutateAsync: addToWishlist } = useAddWishlist();
  const { data } = useGetWhishlist(user?.email as string);
  const isProductExist = data?.data.find(
    (w: any) => w.attributes.product.data.id === id
  );
  const handleAddToWishlist = async () => {
    if (!isProductExist) {
      const data = {
        data: {
          username: user?.username,
          email: user?.email,
          product: id,
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

  if (isError) {
    return (
      <h1 className="text-xl text-center mt-10 md:text-2xl">{error.message}</h1>
    );
  }

  return (
    <div className=" min-h-screen mt-20">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row sm:gap-28">
          {isPending ? (
            <Skeleton className="flex-1 max-w-lg py-16 min-h-[500px]" />
          ) : (
            <div className="flex-1 flex justify-center items-center bg-neutral-white-200 max-w-lg  rounded-md">
              <img
                src={product?.data[0].attributes.images.data[0].attributes.url}
                alt={product?.data[0].attributes.title}
                className="w-[300px] object-cover mix-blend-darken"
              />
            </div>
          )}
          <div className="flex-1 pt-6 pb-3">
            {isPending ? (
              <Skeleton className="w-[500px] h-9" />
            ) : (
              <div className="flex items-center gap-36">
                <h2 className="text-xl font-bold text-neutral-black-900 sm:text-2xl">
                  {product?.data[0].attributes.title}
                </h2>
                <button>
                  <IoShareSocialSharp
                    className="text-2xl text-neutral-black-500"
                    onClick={() => SetOpenShareOverlay(true)}
                  />
                </button>
              </div>
            )}
            <div className="flex items-center gap-5 mt-4">
              {isPending ? (
                <Skeleton className="w-[180px] h-9" />
              ) : (
                <div className="flex items-center gap-3 bg-neutral-white-100 p-[6px] px-5 text-xs text-neutral-black-500 font-medium rounded-full">
                  <FaStar className="text-base text-neutral-black-500" />

                  <p className="flex items-center gap-1">
                    4.2 <span className="-mt-3"> __ </span> 54 Reviews
                  </p>
                </div>
              )}
              {isPending ? (
                <Skeleton className="w-20 h-9" />
              ) : (
                <p className="text-xs font-medium border py-[5px] px-4 rounded-full">
                  {product?.data[0].attributes.stock <= 0
                    ? "OUT OF STOCK"
                    : "IN STOCK"}
                </p>
              )}
            </div>
            {isPending ? (
              <Skeleton className=" w-16 h-9 mt-6" />
            ) : (
              <p className="text-lg font-semibold mt-6">
                ${product?.data[0].attributes.price.toFixed(2)}{" "}
              </p>
            )}
            <div className="mt-8">
              <h3 className="text-xs text-neutral-black-500 font-medium mb-4">
                AVAILABLE COLORS
              </h3>
              <div className="flex space-x-3">
                {isPending
                  ? Array.from({ length: skeletonCount }).map((_, index) => (
                      <Skeleton key={index} className="w-7 h-7 rounded-full" />
                    ))
                  : product?.data[0].attributes.colors.data.map(
                      (color: IColor) => (
                        <button
                          key={color.id}
                          style={{ backgroundColor: color.attributes.name }}
                          className={`w-7 h-7 rounded-full border-[3px] border-white ${
                            color.attributes.name === selectedColor &&
                            "ring-1 ring-neutral-800"
                          }`}
                          onClick={() => {
                            SetSelectedColor(
                              color.attributes.name === selectedColor
                                ? ""
                                : color.attributes.name
                            );
                          }}
                        ></button>
                      )
                    )}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xs text-neutral-black-500 font-medium mb-4">
                SELECT SIZE
              </h3>
              <div className="flex space-x-3">
                {isPending
                  ? Array.from({ length: skeletonCount }).map((_, index) => (
                      <Skeleton key={index} className="w-10 h-10" />
                    ))
                  : product?.data[0].attributes.sizes.data.map(
                      (size: ISize) => (
                        <button
                          key={size.id}
                          className={`w-10 h-10 text-xs text-neutral-black-500 font-medium rounded-sm border ${
                            size.attributes.name === selectedSize &&
                            " border-neutral-black-600"
                          }`}
                          onClick={() => {
                            SetSelectedSize(
                              size.attributes.name === selectedSize
                                ? ""
                                : size.attributes.name
                            );
                          }}
                        >
                          {size.attributes.name}
                        </button>
                      )
                    )}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xs text-neutral-black-500 font-medium mb-4">
                QUANTITY
              </h3>
              <div className=" w-40 flex justify-between items-center text-sm text-neutral-black-500 border py-2.5 px-4 mt-4 rounded-sm">
                <button
                  disabled={quantity === 1}
                  onClick={() => SetQuantity(quantity - 1)}
                >
                  <FaMinus className=" text-xs" />
                </button>
                <input
                  type="text"
                  readOnly
                  value={quantity}
                  className="min-w-6 text-center text-base font-medium outline-none"
                />
                <button onClick={() => SetQuantity(quantity + 1)}>
                  <FaPlus className=" text-xs" />
                </button>
              </div>
            </div>
            <div className="flex gap-8 mt-8">
              <Button
                disabled={selectedColor === "" || selectedSize === ""}
                className={`w-72 duration-300`}
                onClick={() => {
                  addToCart({
                    id,
                    quantity,
                    color: selectedColor,
                    size: selectedSize,
                  });
                  setOpenCart(true);
                }}
              >
                Add to cart
              </Button>
              <button
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  if (!user) {
                    toast.warn("You must sign in first");
                  } else {
                    handleAddToWishlist();
                  }
                }}
                className="group w-12 flex justify-center items-center text-2xl text-neutral-black-500 border rounded-sm duration-300 hover:border-neutral-black-700"
              >
                <CiHeart className=" duration-300 group-hover:scale-110" />
              </button>
            </div>
            <p className="text-xs text-neutral-black-500 font-medium mt-3 uppercase tracking-wide">
              — Free shipping on orders $100+
            </p>
          </div>
        </div>
        <Tabs
          defaultValue="details"
          className="flex flex-col gap-12 mt-44 sm:flex-row"
        >
          <TabsList className="w-56 mt-6 flex flex-col gap-4 bg-transparent  ">
            <TabsTrigger
              value="details"
              className="w-full flex justify-start gap-3 text-sm py-2 px-5 rounded-sm data-[state=active]:border-none data-[state=active]:bg-neutral-white-100 "
            >
              <BsThreeDots />
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="w-full flex justify-start gap-3 text-sm py-2 px-5 rounded-sm data-[state=active]:border-none data-[state=active]:bg-neutral-white-100 "
            >
              <FaStar />
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className=" max-w-2xl">
            <h4 className=" font-semibold mb-4">Details</h4>
            <p className="text-sm text-neutral-black-500 leading-7">
              {product?.data[0].attributes.description}
            </p>
          </TabsContent>
          <TabsContent value="reviews">No Reviews</TabsContent>
        </Tabs>

        {similarProducts?.data.length ? (
          <div className="container pb-24 pt-20 md:pt-32">
            <div className="">
              <h3 className="text-2xl text-neutral-black-900 font-semibold">
                You might also like
              </h3>
              <p className="text-xs text-neutral-500 uppercase">
                similar products
              </p>
            </div>
            <div className="mt-14 -me-[19px]">
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
              >
                <CarouselContent>
                  {similarProducts.data.map((product: IProduct) => (
                    <CarouselItem
                      key={product.id}
                      className="basis-auto sm:basis-1/3 md:basis-1/4 "
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        ) : null}
      </div>
      <NewsletterSection />
      {openShareOverlay && (
        <ShareLink SetOpenShareOverlay={SetOpenShareOverlay} />
      )}
    </div>
  );
};

export default ProductDetailsPage;
