import { Link } from "react-router-dom";

type SearchItemProps = {
  name: string;
  price: number;
  imageUrl: string;
};

const SearchItem = ({ name, price, imageUrl }: SearchItemProps) => {
  return (
    <div className=" border-gray-200">
      <div className="flex items-center gap-4 ">
        <div className="relative flex justify-center items-center w-16 h-16 bg-neutral-white-100 rounded-sm">
          <img
            src={imageUrl}
            alt="./assets/classic-tees.png"
            className=" w-[80%] h-[80%]  object-cover "
          />
        </div>

        <div className="flex-1 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div className="flex gap-2 sm:flex-col">
            <h3 className="text-xs font-medium">{name} </h3>
            <span className="text-xs font-medium ">${price.toFixed(2)} </span>
          </div>
          <Link
            to={`/search/${name}`}
            className="text-xs text-neutral-black-800 border border-neutral-black-900 p-1.5 rounded-md"
          >
            View item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
