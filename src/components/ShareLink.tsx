import { Input } from "./ui/input";
import { FaFacebookF } from "react-icons/fa6";
import { FaWhatsapp, FaTelegramPlane, FaPinterestP } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { LiaClipboardSolid } from "react-icons/lia";
import { FaCheck } from "react-icons/fa6";
import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";

type ShareLinkProps = {
  SetOpenShareOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShareLink = ({ SetOpenShareOverlay }: ShareLinkProps) => {
  const [copied, setCopied] = useState(false);
  const textInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    const text = textInputRef.current?.value;

    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    }
  };
  return (
    <div className=" fixed top-0 w-full h-full  flex justify-center items-center bg-black/20 z-[1000] px-4">
      <div className="relative w-[424px] h-72 rounded-md px-10 pt-8 pb-20 bg-white">
        <button
          className=" absolute -top-10 right-0 ht- p-2 bg-white text-xl rounded-full"
          onClick={() => SetOpenShareOverlay(false)}
        >
          <CgClose />
        </button>
        <h5 className=" text-neutral-black-900 font-semibold mb-5">
          Copy Link
        </h5>
        <div className="flex items-center  gap-3 mb-10">
          <Input
            ref={textInputRef}
            className="text-sm text-neutral-black-700 font-medium h-11 text-nowrap truncate"
            value={window.location.href}
            readOnly
          />
          <button className="border rounded-md p-[9px]" onClick={handleClick}>
            {copied ? (
              <FaCheck className="text-2xl text-neutral-black-500" />
            ) : (
              <LiaClipboardSolid className="text-2xl text-neutral-black-500" />
            )}
          </button>
        </div>
        <h5></h5>
        <h5 className=" text-neutral-black-900 font-semibold mb-7">Share</h5>
        <ul className="flex items-center gap-7">
          <li>
            <a href="https://www.facebook.com/" target="_blank">
              <FaFacebookF className="text-xl text-neutral-black-500" />
            </a>
          </li>
          <li>
            <a href="https://x.com/" target="_blank">
              <RiTwitterXFill className="text-xl text-neutral-black-500" />
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/" target="_blank">
              <FaPinterestP className="text-xl text-neutral-black-500" />
            </a>
          </li>
          <li>
            <a href="https://telegram.org/ " target="_blank">
              <FaTelegramPlane className="text-xl text-neutral-black-500" />
            </a>
          </li>
          <li>
            <a href="https://www.whatsapp.com/" target="_blank">
              <FaWhatsapp className="text-xl text-neutral-black-500" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShareLink;
