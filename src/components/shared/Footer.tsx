import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const path = useLocation();
  const isGray = path.pathname === "/" || path.pathname.includes("search");

  return (
    <footer className={`pt-16 ${!isGray ? "bg-neutral-white-100" : ""}`}>
      <div className="container flex flex-col gap-10 pb-20 md:flex-row md:justify-between">
        <div className=" space-y-6">
          <img src="/assets/footer-logo.svg" width={168} height={44} alt="" />
          <p className="text-sm text-neutral-black-500 max-w-64 leading-6">
            DevCut is a YouTube channel for practical project-based learning.
          </p>
          <ul className="flex items-center gap-3">
            <li>
              <Link to={"/"} className="text-2xl text-neutral-black-500">
                <FaGithub />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-2xl text-neutral-black-500">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-2xl text-neutral-black-500">
                <FaYoutube />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col divide-y-[1px] md:flex-row md:divide-y-0 md:gap-16">
          <ul className=" space-y-4 pb-4 md:p-0">
            <h4 className="text-sm text-neutral-black-300 font-medium uppercase mb-8">
              Support
            </h4>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500  font-medium"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500  font-medium"
              >
                Terms of use
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <ul className=" space-y-4 py-4 md:p-0">
            <h4 className="text-sm text-neutral-black-300 font-medium uppercase mb-8">
              company
            </h4>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                Careers
              </Link>
            </li>
          </ul>
          <ul className=" space-y-4 pt-4 md:p-0">
            <h4 className="text-sm text-neutral-black-300 font-medium uppercase mb-8">
              shop
            </h4>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                My Account
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                Checkout
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="text-sm text-neutral-black-500 font-medium"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm text-neutral-black-300 font-medium uppercase mb-8">
            ACCEPTED PAYMENTS
          </h4>
          <ul className="flex items-center ">
            <li>
              <img src="/assets/mastercard.svg" width={31} height={31} alt="" />
            </li>
            <li>
              <img src="/assets/amex.svg" width={57} height={32} alt="" />
            </li>
            <li>
              <img src="/assets/visa.svg" width={43} height={32} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div className="container text-sm text-center text-neutral-black-500 py-6 md:border-t">
        {" "}
        &copy; 2024 DevCut. All rights reserved
        <div>
          Developed By
          <a
            href="https://github.com/AnouerMokrane"
            target="_blank"
            className="text-blue-400 underline"
          >
            {" "}
            Anouer
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
