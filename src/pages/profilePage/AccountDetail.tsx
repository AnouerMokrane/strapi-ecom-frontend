import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/stores/authStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type AccountDetailForm = {
  fullName: string;
  email: string;
};

const AccountDetail = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountDetailForm>();

  const onSubmit = async (data: AccountDetailForm) => {
    const userId = user?.id;
    const token = localStorage.getItem("jwt");

    const response = await fetch(`http://localhost:1337/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
      }),
    });

    if (response.ok) {
      if (user) {
        setUser({
          ...user,
          fullName: data.fullName,
          email: data.email,
        });
      }
      toast.success("User updated successfully!");
    } else {
      console.error("Error updating user:", response.statusText);
    }
  };

  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Account Details
      </h1>
      <form className="max-w-xs space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue={user?.fullName}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">Full name is required</p>
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
            defaultValue={user?.email}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">Email is required</p>
          )}
        </div>

        <Button type="submit" className="relative top-5 p-6">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default AccountDetail;
