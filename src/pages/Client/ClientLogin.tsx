import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useAppDispatch } from "../../store/hooks";
import { loginSuccess } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
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
import Navbar from "./Navbar";
import { Helmet } from "react-helmet-async";
import LoginBannerSlider from "@/components/LoginBanner";
export default function ClienLogin() {
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
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <>
      <Helmet>
        <title>My Next Market | Best Market Services in Burundi</title>
        <meta
          name="Add New Product"
          content="We offer the best services in Burundi. Fast, reliable and affordable."
        />
        <meta
          name="keywords"
          content="business, services, Burundi, affordable,market,next"
        />

        {/* Open Graph (Facebook, WhatsApp) */}
        <meta
          property="og:title"
          content="My Next Market | Best Market Services in Burundi"
        />
        <meta
          property="og:description"
          content="We offer the best Market services in Burundi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mynextmarket.com" />
        <meta property="og:image" content="https://mynextmarket.com/logo.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] px-4 relative">
        <Navbar />
        {/* Gold glowing background */}
        <div className="absolute top-10 left-20 w-60 h-60 bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl"></div>

        <Card className="w-full max-w-5xl backdrop-blur-xl bg-[#1f1f1f]/60 border border-yellow-500/20 shadow-[0_0_25px_rgba(255,179,0,0.25)] rounded-2xl overflow-hidden grid md:grid-cols-2">
          {/* LEFT SIDE - TEXT + IMAGE */}
          <div className="hidden md:flex flex-col justify-center p-10  text-white">
            <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
              Welcome Back,
            </h1>
            <p className="opacity-90 mb-6">
              Login to access your account and have an access to Upload your
              Products Too!
            </p>
            {/* <img
              src={Login}
              alt="Login Illustration"
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
                Login
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
              <div className="flex flex-col">
                <Link
                to="/register"
                className="text-blue-200 italic text-sm font-bold cursor-pointer text-center"
              >
                No Account Yet? Click Here to Create One
              </Link>
              <Link
                to="/forgot-password"
                className="italic text-sm  cursor-pointer text-center text-gray-500"
              >
                Forgot Password? Reset Here
              </Link>
              </div>
              <p className="mt-6 text-gray-400 text-center text-xs">
                © 2025 {NAME}. All rights reserved.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
