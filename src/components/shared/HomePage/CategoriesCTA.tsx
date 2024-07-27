import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CategoriesCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <section ref={ref} className=" bg-neutral-white-100 mb-20 py-14 md:py-0">
      <div className="container flex justify-between items-center ">
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-neutral-black-900 md:text-2xl">
            Browse Our Fashion Paradise!
          </h3>
          <p className="text-sm text-neutral-black-500 my-5 max-w-[400px]">
            Step into a world of style and explore our diverse collection of
            clothing categories.
          </p>
          <Link
            to={"/search"}
            className="flex items-center gap-3 bg-neutral-black-900 max-w-fit text-sm text-white font-medium py-2 px-6 rounded-sm"
          >
            Start Browsing
            <FaArrowRight />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 300 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="./assets/Category-Image.png"
            className="hidden md:block w-64 h-80"
            alt=""
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : { scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesCTA;
