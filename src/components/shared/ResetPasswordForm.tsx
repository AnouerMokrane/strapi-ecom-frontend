import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
type ResetPasswordFormProps = {
  onSubmit: (data: ResetPasswordInputs) => Promise<void>;
};

const ResetPasswordForm = ({ onSubmit }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-black-600"
        >
          New Password
        </label>
        <Input
          type="password"
          {...register("password")}
          className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm"
        />
        <p className="text-xs text-red-400 mt-0.5">
          {errors.password?.message}
        </p>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-neutral-black-600"
        >
          Confirm Password
        </label>
        <Input
          type="password"
          {...register("confirmPassword")}
          className="mt-1 block w-full px-3 py-2 shadow-sm sm:text-sm"
        />
        <p className="text-xs text-red-400 mt-0.5">
          {errors.confirmPassword?.message}
        </p>
      </div>
      <Button type="submit" className="w-full text-sm">
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
