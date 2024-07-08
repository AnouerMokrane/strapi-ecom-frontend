import ResetPasswordForm, {
  ResetPasswordInputs,
} from "@/components/shared/ResetPasswordForm";
import RequestResetForm from "@/components/shared/RequestResetForm";
import { useState } from "react";

const ResetPassword = () => {
  const [step] = useState(true);
  const handleRequestReset = async () => {};
  const handleResetPassword = async (data: ResetPasswordInputs) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="w-full max-w-xs">
        {step ? (
          <>
            <p className="text-sm text-neutral-black-600 mb-8 leading-6">
              Please enter the email address associated with your account. We'll
              promptly send you a link to reset your password.
            </p>
            <RequestResetForm onSubmit={handleRequestReset} />
          </>
        ) : (
          <>
            <ResetPasswordForm onSubmit={handleResetPassword} />
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
