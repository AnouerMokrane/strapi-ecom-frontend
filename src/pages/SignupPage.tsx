import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/stores/authStore";
import { useSignup } from "@/lib/api/api";
import { toast } from "react-toastify";

const userSchema = z.object({
  username: z.string().trim().min(4, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type Inputs = z.infer<typeof userSchema>;

const SignupPage = () => {
  const { mutateAsync: signup } = useSignup();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });

  const submit = async (data: Inputs) => {
    try {
      const res = await signup(data);
      if (res) {
        localStorage.setItem("jwt", res.jwt);
        useAuth.getState().setUser(res.userData);
        toast.success("Signup Successful!", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      toast.error("Signup failed. Please check your details and try again.", {
        position: "top-center",
      });
      console.error("Signup error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="bg-white p-8 rounded  w-full max-w-sm">
        <button className="w-full py-2 px-4 mb-6 border border-gray-300 rounded flex items-center justify-center space-x-2">
          <img
            src="https://www.google.com/images/icons/product/search-32.gif"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>
        <div className="flex items-center my-4">
          <div className="border-t w-full border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-400">OR</span>
          <div className="border-t w-full border-gray-300"></div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs mt-0.5 text-red-400">
              {errors.username?.message}{" "}
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs mt-0.5 text-red-400">
              {errors.email?.message}{" "}
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs mt-0.5 text-red-400">
              {errors.password?.message}{" "}
            </p>
          </div>
          <div className="text-xs font-medium text-neutral-black-500 leading-6">
            By Creating An Account You Agree With Our Terms Of Service, Privacy
            Policy
          </div>
          <Button type="submit" className="w-full ">
            Create account
          </Button>
        </form>
        <div className="text-sm text-center mt-4">
          <Link to="/login" className="text-sm text-neutral-black-500">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
