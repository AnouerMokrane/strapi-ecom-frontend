import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/lib/api/api";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/stores/authStore";

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type Inputs = z.infer<typeof userSchema>;

const LoginPage = () => {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: user?.email || "",
      password: "",
    },
    resolver: zodResolver(userSchema),
  });

  const submit = async (data: Inputs) => {
    try {
      const res = await login({
        identifier: data.email,
        password: data.password,
      });

      if (res) {
        localStorage.setItem("jwt", res.jwt);
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
        toast.success("Login Successful!", {
          position: "top-center",
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          position: "top-center",
        }
      );
      console.error("Login error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="bg-white p-8 rounded w-full max-w-sm">
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs text-red-400 mt-0.5">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p className="text-xs text-red-400 mt-0.5">
              {errors.password?.message}
            </p>
          </div>

          <Link
            to="/forgot-password"
            className="block w-fit text-xs text-neutral-black-600 font-medium ms-auto pb-1"
          >
            Forgot Password?
          </Link>
          <Button type="submit" className="w-full text-sm ms-auto">
            Login
          </Button>
        </form>
        <div className="text-sm text-center mt-4">
          <Link to="/signup" className="text-sm text-neutral-black-500">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
