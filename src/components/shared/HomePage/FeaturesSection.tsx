import { MdOutlineLocalShipping } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import { RiSecurePaymentLine } from "react-icons/ri";

const FeaturesSection = () => {
  return (
    <section className="container grid gap-12  py-24 sm:grid-cols-2 md:grid-cols-3">
      <div className="max-w-64">
        <div className="w-12 h-12 flex justify-center items-center bg-neutral-white-100 rounded-full">
          <MdOutlineLocalShipping className="text-2xl" />
        </div>
        <h3 className="text-lg text-neutral-black-900 font-semibold my-4">
          Free Shipping
        </h3>
        <p className="text-sm text-neutral-black-500 leading-6">
          Upgrade your style today and get FREE shipping on all orders! Don't
          miss out.
        </p>
      </div>
      <div className="max-w-64">
        <div className="w-12 h-12 flex justify-center items-center bg-neutral-white-100 rounded-full">
          <GrCertificate className="text-2xl" />
        </div>
        <h3 className="text-lg text-neutral-black-900 font-semibold my-4">
          Satisfaction Guarantee
        </h3>
        <p className="text-sm text-neutral-black-500 leading-6">
          Shop confidently with our Satisfaction Guarantee: Love it or get a
          refund.
        </p>
      </div>
      <div className="max-w-64">
        <div className="w-12 h-12 flex justify-center items-center bg-neutral-white-100 rounded-full">
          <RiSecurePaymentLine className="text-2xl" />
        </div>
        <h3 className="text-lg text-neutral-black-900 font-semibold my-4">
          Secure Payment
        </h3>
        <p className="text-sm text-neutral-black-500 leading-6">
          Your security is our priority. Your payments are secure with us.
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;
