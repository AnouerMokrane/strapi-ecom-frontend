import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Password = () => {
  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Change Password
      </h1>
      <form className=" max-w-xs space-y-4">
        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            New password
          </label>
          <Input className="text-sm text-neutral-black-700" />
        </div>
        <div>
          <label
            htmlFor=""
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Confirm Password
          </label>
          <Input className="text-sm text-neutral-black-700" />
        </div>

        <Button className="relative top-5 p-6">Change password</Button>
      </form>
    </div>
  );
};

export default Password;
