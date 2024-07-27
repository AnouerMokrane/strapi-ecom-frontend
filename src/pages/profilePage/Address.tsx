import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/stores/authStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface AddressForm {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const Address = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressForm>();

  const onSubmit = async (data: AddressForm) => {
    const userId = user?.id;
    const token = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        `http://localhost:1337/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shippingAddress: {
              streetAddress: data.streetAddress,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
              country: data.country,
            },
          }),
        }
      );

      if (response.ok) {
        if (user) {
          setUser({
            ...user,
            shippingAddress: data,
          });
        }
        toast.success("Shipping address updated successfully!");
      } else {
        console.error("Error updating shipping address:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
    }
  };

  return (
    <div>
      <h1 className="text-neutral-black-900 font-semibold pb-10">
        Shipping address
      </h1>
      <form className="max-w-lg space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="streetAddress"
            className="text-sm font-medium text-neutral-black-500 mb-1 "
          >
            Street Address
          </label>
          <Input
            id="streetAddress"
            className="text-sm text-neutral-black-700"
            defaultValue={user?.shippingAddress.streetAddress}
            {...register("streetAddress", {
              required: "Street address is required",
            })}
          />
          {errors.streetAddress && (
            <p className="text-sm text-red-500">
              {errors.streetAddress.message}
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              City
            </label>
            <Input
              id="city"
              className="text-sm text-neutral-black-700"
              defaultValue={user?.shippingAddress.city}
              {...register("city", {
                required: "City is required",
              })}
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              State
            </label>
            <Input
              id="state"
              className="text-sm text-neutral-black-700"
              defaultValue={user?.shippingAddress.state}
              {...register("state", {
                required: "State is required",
              })}
            />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              Zip Code
            </label>
            <Input
              id="zipCode"
              className="text-sm text-neutral-black-700"
              defaultValue={user?.shippingAddress.zipCode}
              {...register("zipCode", {
                required: "Zip code is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Invalid zip code",
                },
              })}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-500">{errors.zipCode.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="country"
              className="text-sm font-medium text-neutral-black-500 mb-1 "
            >
              Country
            </label>
            <Input
              id="country"
              className="text-sm text-neutral-black-700"
              defaultValue={user?.shippingAddress.country}
              {...register("country", {
                required: "Country is required",
              })}
            />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country.message}</p>
            )}
          </div>
        </div>
        <Button className="p-6" type="submit">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default Address;
