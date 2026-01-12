import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { NAME } from "@/Name";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Login from "../../assets/login.svg";
import LoginBannerSlider from "@/components/LoginBanner";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const res = await login({ username, password }).unwrap();
      console.log("login response", res);
      dispatch(loginSuccess({ token: res.access, username, user: res.user }));
      navigate("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(err?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] px-4 relative">
      {/* Gold glowing background */}
      <div className="absolute top-10 left-20 w-60 h-60 bg-orange-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-5xl backdrop-blur-xl bg-[#1f1f1f]/60 border border-yellow-500/20 shadow-[0_0_25px_rgba(255,179,0,0.25)] rounded-2xl overflow-hidden grid md:grid-cols-2">
        {/* LEFT SIDE - TEXT + IMAGE */}
        <div className="hidden md:flex flex-col justify-center p-10  text-white">
          <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
            Welcome Back, Admin
          </h1>
          <p className="opacity-90 mb-6">
            Manage your products, categories, templates, and more — all in one
            elegant dashboard with full control.
          </p>
          {/* <img
            src={Login}
            alt="Admin Illustration"
            className="w-64 mx-auto drop-shadow-xl"
          /> */}
          <div className="w-64  drop-shadow-2xl">
            <LoginBannerSlider />
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="p-10 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
              Admin Login
            </CardTitle>
          </CardHeader>

          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-200 mb-1">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="bg-[#2b2b2b] text-white border-yellow-500/30 placeholder-gray-400 focus-visible:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-gray-200 mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#2b2b2b] text-white border-yellow-500/30 placeholder-gray-400 focus-visible:ring-yellow-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-orange-500 to-yellow-500 text-black font-semibold shadow-[0_0_12px_rgba(255,180,0,0.5)] hover:opacity-90 transition rounded-lg"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <p className="mt-6 text-gray-400 text-center text-xs">
              © 2025 {NAME}. All rights reserved.
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
