import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const requestResetSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export type RequestResetFormInputs = z.infer<typeof requestResetSchema>;
type RequestResetFormProps = {
  onSubmit: (data: RequestResetFormInputs) => Promise<void>;
};

const RequestResetForm = ({ onSubmit }: RequestResetFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetFormInputs>({
    defaultValues: { email: "" },
    resolver: zodResolver(requestResetSchema),
  });

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <p className="text-xs text-red-400 mt-0.5">{errors.email?.message}</p>
      </div>
      <Button type="submit" className="w-full text-sm">
        Send reset link
      </Button>
    </form>
  );
};

export default RequestResetForm;
