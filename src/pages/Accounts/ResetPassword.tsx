import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLoading3Quarters } from "react-icons/ai";

const ResetPasswordPage = () => {
  const location = useLocation();
  const resetToken = location.state?.resetToken;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Enter all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ reset_token: resetToken, new_password: password }).unwrap();
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      toast.error(err.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-500 via-gray-300 to-white flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-200 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Enter your new password below
        </p>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-4 p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 outline-none transition"
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <button
          onClick={handleReset}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-center mt-6 text-gray-400 text-sm">
          Remembered your password?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
