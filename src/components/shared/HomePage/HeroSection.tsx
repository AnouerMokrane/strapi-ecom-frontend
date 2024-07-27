import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className=" flex h-[300px] bg-neutral-white-100 overflow-hidden md:h-[440px]">
      <div className="container flex justify-between items-center ">
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl text-neutral-black-900 font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Fresh Arrivals Online
          </motion.h1>
          <motion.p
            className=" text-sm text-neutral-black-600 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Discover Our Newest Collection Today.
          </motion.p>
          <Link
            to={"/search"}
            className="flex items-center gap-3 w-fit bg-neutral-black-900 p-3 px-5 text-sm text-white mt-9 rounded-sm"
          >
            View Collection
            <FaArrowRight />
          </Link>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-32 -left-14 ">
            <img src="./assets/star.svg" alt="" />
          </div>
          <div className="hidden md:block relative top-8">
            <motion.img
              src="./assets/hero-image.webp"
              alt=""
              className=" relative z-[1]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            <img
              src="./assets/star.svg"
              alt=""
              className="absolute top-4 -left-20 "
            />
            <div className=" w-[340px] h-[340px] absolute top-8 -left-20 bg-neutral-white-200 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
