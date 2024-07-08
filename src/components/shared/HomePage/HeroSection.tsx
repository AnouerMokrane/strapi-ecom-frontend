import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className=" flex h-[300px] bg-neutral-white-100 overflow-hidden md:h-[440px]">
      <div className="container flex justify-between items-center ">
        <div>
          <h1 className="text-3xl text-neutral-black-900 font-semibold mb-4">
            Fresh Arrivals Online
          </h1>
          <p className=" text-sm text-neutral-black-600 mb-3">
            Discover Our Newest Collection Today.
          </p>
          <Link
            to={"/search"}
            className="flex items-center gap-3 w-fit bg-neutral-black-900 p-3 px-5 text-sm text-white mt-9 rounded-sm"
          >
            View Collection
            <FaArrowRight />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -top-32 -left-14 ">
            <img src="./assets/star.svg" alt="" />
          </div>
          <div className="hidden md:block relative top-8">
            <img
              src="./assets/hero-image.webp"
              alt=""
              className=" relative z-[1]"
            />

            <img
              src="./assets/star.svg"
              alt=""
              className="absolute top-4 -left-20 "
            />
            <div className=" w-[340px] h-[340px] absolute top-8 -left-20 bg-neutral-white-200 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
