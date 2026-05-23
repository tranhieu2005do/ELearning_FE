import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Moon, Sun, ArrowRight, AlertCircle } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { EduBackground } from "./components/illustrations/EduBackground";
import { authApi, ApiError } from "./services/api";
import { OAuthCallback } from "./pages/OAuthCallback";
import { Dashboard } from "./pages/Dashboard";
import { Homepage } from "./pages/Homepage";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [apiError, setApiError] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const rawPathname = window.location.pathname;
  const pathname = rawPathname.replace(/\/$/, "") || "/";
  const isDashboardPage = pathname === "/dashboard";
  const isLoginPage = pathname === "/login";
  const isOAuthCallback = pathname.startsWith("/oauth/callback");

  // Apply dark mode theme on mount and change
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    if (isDarkMode) {
      root.classList.add("dark");
      body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const validate = () => {
    const tempErrors: { email?: string; password?: string } = {};
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await authApi.login({
        email,
        password,
      });

      // Login successful, response contains token and refreshToken
      console.log("Login successful:", response.email);
      window.location.replace("/");
      return;
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
        console.error("Login error:", error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const googleAuthUrl = await authApi.getGoogleOAuthUrl();
      window.location.href = googleAuthUrl;
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("Failed to initiate Google login");
      }
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      const facebookAuthUrl = await authApi.getFacebookOAuthUrl();
      window.location.href = facebookAuthUrl;
    } catch (error) {
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("Failed to initiate Facebook login");
      }
      setIsLoading(false);
    }
  };

  if (isDashboardPage) {
    return <Dashboard />;
  }

  if (isOAuthCallback) {
    return <OAuthCallback />;
  }

  if (isLoginPage) {
    return (
      <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 overflow-hidden">
        {/* Immersive Left Side Background */}
        <EduBackground />

        {/* Right Side Form Panel */}
        <div className="relative flex flex-col justify-between w-full lg:w-1/2 h-full bg-slate-50 dark:bg-slate-950 p-6 md:p-12 overflow-y-auto">
        {/* Top Header - Theme Toggle & Mobile Logo */}
        <div className="flex justify-between items-center w-full relative z-20">
          {/* Mobile Logo Only */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">
              Aethera
            </span>
          </div>

          <div className="hidden lg:block" />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        {/* Center Content / Form Card */}
        <div className="my-auto mx-auto w-full max-w-[420px] relative z-10 py-8">
          <AnimatePresence mode="wait">
            {!loginSuccess ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Greeting */}
                <div className="text-left mb-8">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Welcome back
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Enter your credentials to access your courses and workspace.
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all font-medium text-sm text-slate-700 dark:text-slate-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all font-medium text-sm text-slate-700 dark:text-slate-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="h-4 w-4 text-[#1877F2]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22 12.07C22 6.53 17.52 2 12 2S2 6.53 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22C18.34 21.21 22 17.07 22 12.07z" />
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex py-4 items-center mb-6">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Or continue with email
                  </span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                {/* API Error Message */}
                {apiError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {apiError}
                    </p>
                  </div>
                )}

                {/* Sign-in Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  <Input
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    leftIcon={<Mail className="h-4 w-4" />}
                    disabled={isLoading}
                    autoComplete="email"
                  />

                  <div className="space-y-1">
                    <Input
                      label="Password"
                      isPassword
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={errors.password}
                      leftIcon={<Lock className="h-4 w-4" />}
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>

                  {/* Remember me & Forgot Password */}
                  <div className="flex items-center justify-between pt-1 select-none">
                    <Checkbox
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline focus:outline-none transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full mt-4"
                    isLoading={isLoading}
                    rightIcon={!isLoading && <ArrowRight className="h-4 w-4" />}
                  >
                    Sign In
                  </Button>
                </form>

                {/* Bottom Redirection */}
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6 select-none">
                  Don't have an account?{" "}
                  <button className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline focus:outline-none transition-colors">
                    Sign up for free
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="login-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8 glassmorphism-card p-8 rounded-3xl border border-indigo-500/20"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 stroke-[3px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Access Granted
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  Successfully logged in. Preparing your Aethera dashboard...
                </p>
                <Button
                  onClick={() => setLoginSuccess(false)}
                  variant="secondary"
                  size="sm"
                  className="mx-auto"
                >
                  Go Back to Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-600 mt-auto select-none pt-4 relative z-20">
          <span>
            &copy; {new Date().getFullYear()} Aethera Inc. All rights reserved.
          </span>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="#"
              className="hover:underline hover:text-slate-600 dark:hover:text-slate-400"
            >
              Terms
            </a>
            <span className="text-slate-300 dark:text-slate-800">&middot;</span>
            <a
              href="#"
              className="hover:underline hover:text-slate-600 dark:hover:text-slate-400"
            >
              Privacy
            </a>
            <span className="text-slate-300 dark:text-slate-800">&middot;</span>
            <a
              href="#"
              className="hover:underline hover:text-slate-600 dark:hover:text-slate-400"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

  return <Homepage />;
}

export default App;
