import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateAccountDetail } from "@/lib/api/api";
import { useAuth } from "@/lib/stores/authStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AccountDetailForm = {
  fullName: string;
  email: string;
};

const AccountDetail = () => {
  const { user, setUser } = useAuth();
  const { mutateAsync: updateAccount } = useUpdateAccountDetail();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountDetailForm>({
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
    },
  });

  const onSubmit = async (data: AccountDetailForm) => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    try {
      const response = await updateAccount({ userId: user.id, data });

      if (response.statusText === "OK") {
        setUser({
          ...user,
          fullName: data.fullName,
          email: data.email,
        });
        toast.success("User updated successfully!");
      } else {
        toast.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Account Details
      </h1>
      <form
        className="max-w-xs space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Full name
          </label>
          <Input
            id="fullName"
            type="text"
            className="text-sm text-neutral-black-700"
            {...register("fullName", {
              required: true,
              pattern: /^[a-zA-Z ]+$/,
            })}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">
              {errors.fullName.type === "required"
                ? "Full name is required"
                : "Invalid full name format"}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            className="text-sm text-neutral-black-700"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.type === "required"
                ? "Email is required"
                : "Invalid email format"}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="relative top-5 p-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default AccountDetail;
