import ProductCard from "../ProductCard";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/lib/api/api";
import { IProduct } from "@/types";

const ProductsListSection = () => {
  const { data: featurdProducts } = useGetProducts(
    "/products?populate=*&filters[isFeatured][$eq]=true"
  );
  const { data: newArrivalsProducts } = useGetProducts(
    "/products?populate=*&filters[categories][id][$eq]=2"
  );

  return (
    <section className="container pb-24 md:pt-14">
      <div className="mt-14 -me-[19px]">
        <Tabs defaultValue="featured">
          <TabsList className=" w-full text-center bg-white gap-4 mb-12">
            <TabsTrigger
              value="featured"
              className="rounded-full data-[state=active]:border"
            >
              Featured
            </TabsTrigger>
            <TabsTrigger
              value="latest"
              className=" rounded-full data-[state=active]:border"
            >
              New arrivals
            </TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {featurdProducts?.data.map((product: IProduct) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-auto lg:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
          <TabsContent value="latest">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                {newArrivalsProducts?.data.map((product: IProduct) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-auto lg:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsListSection;
