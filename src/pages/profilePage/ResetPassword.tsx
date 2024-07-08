import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/stores/authStore";

import { useState } from "react";
import ResetPasswordForm, {
  ResetPasswordInputs,
} from "@/components/shared/ResetPasswordForm";
import RequestResetForm, {
  RequestResetFormInputs,
} from "@/components/shared/RequestResetForm";
import apiClient from "@/lib/api/api";
import axios from "axios";

const ResetPassword = () => {
  const { setUser, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("request");

  const handleRequestReset = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/forgot-password",
        {
          email: data.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Handle success response (e.g., display a message to the user)
      console.log("Password reset link sent:", response.data);
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };
  const handleResetPassword = async (data: ResetPasswordInputs) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      <div className="w-full max-w-xs">
        {step === "request" ? (
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
