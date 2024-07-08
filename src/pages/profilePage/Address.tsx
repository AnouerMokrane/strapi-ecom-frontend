import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Address = () => {
  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Shipping address
      </h1>
      <form className=" max-w-lg space-y-4">
        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Street Address
          </label>
          <Input className="text-sm text-neutral-black-700" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              City
            </label>
            <Input className="text-sm text-neutral-black-700" />
          </div>
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              State
            </label>
            <Input className="text-sm text-neutral-black-700" />
          </div>
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              Zipe Code
            </label>
            <Input className="text-sm text-neutral-black-700" />
          </div>
          <div>
            <label
              htmlFor=""
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              Country
            </label>
            <Input className="text-sm text-neutral-black-700" />
          </div>
        </div>
        <Button className="relative top-5 p-6">Save Changes</Button>
      </form>
    </div>
  );
};

export default Address;
