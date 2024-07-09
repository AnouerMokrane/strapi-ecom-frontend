import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AccountDetail = () => {
  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Account Details
      </h1>
      <form className=" max-w-xs space-y-4">
        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Full name
          </label>
          <Input className="text-sm text-neutral-black-700" />
        </div>
        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Email
          </label>
          <Input className="text-sm text-neutral-black-700" />
        </div>

        <Button className="relative top-5 p-6">Save Changes</Button>
      </form>
    </div>
  );
};

export default AccountDetail;
