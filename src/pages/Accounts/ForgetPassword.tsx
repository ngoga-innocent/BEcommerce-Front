import { useState } from "react";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || "OTP sent successfully!");

      // Navigate to OTP page with email
      setTimeout(() => {
        navigate("/reset-password/otp", { state: { email } });
      }, 1500); // small delay for user to see toast
    } catch (err: any) {
      toast.error(err.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-500 via-gray-400 to-white flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your email to receive a one-time password (OTP) to reset your password
        </p>

        <div className="relative mb-6">
          <FiMail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
          />
        </div>

        <button
          onClick={handleSendOTP}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Remembered your password?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
