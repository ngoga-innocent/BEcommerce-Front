import { useState } from "react";
import { useVerifyResetOTPMutation } from "../../features/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLock, AiOutlineLoading3Quarters } from "react-icons/ai";

const VerifyOTPPage = () => {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [verifyOTP, { isLoading }] = useVerifyResetOTPMutation();

  const handleVerify = async () => {
    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    try {
      const res = await verifyOTP({ email, otp }).unwrap();
      toast.success("OTP verified successfully!");

      // Navigate to reset password page with token
      setTimeout(() => {
        navigate("/reset-password/reset-password", { state: { resetToken: res.reset_token } });
      }, 1200);
    } catch (err: any) {
      toast.error(err.data?.detail || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-400 via-gray-300 to-white flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Verify OTP
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter the one-time password (OTP) sent to <span className="font-medium">{email}</span>
        </p>

        <div className="relative mb-6">
          <AiOutlineLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-10 p-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 outline-none transition"
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
          {isLoading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Didn't receive OTP?{" "}
          <span
            className="text-green-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
