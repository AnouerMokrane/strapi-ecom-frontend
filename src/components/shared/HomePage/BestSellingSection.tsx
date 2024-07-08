import ProductCard from "../ProductCard";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetProducts } from "@/lib/api/api";
import { IProduct } from "@/types";

const BestSellingSection = () => {
  const { data: products } = useGetProducts(
    "/products?populate=*&filters[categories][id][$eq]=4"
  );
  return (
    <section className="container pb-24 md:pt-14">
      <div className="text-center">
        <p className="text-xs text-neutral-500">SHOP NOW</p>
        <h3 className="text-2xl text-neutral-black-900 font-semibold">
          Best Selling
        </h3>
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
            {products?.data.map((product: IProduct) => (
              <CarouselItem
                key={product.id}
                className="basis-auto lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BestSellingSection;
