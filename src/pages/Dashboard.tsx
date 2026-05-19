import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

export function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");

    if (!accessToken) {
      setIsAuthorized(false);
      const timer = window.setTimeout(() => {
        window.location.replace("/");
      }, 2000);
      return () => window.clearTimeout(timer);
    }

    setIsAuthorized(true);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    window.location.replace("/");
  };

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center p-8 bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
            Access denied
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            You are not logged in. Redirecting to the login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-xl rounded-3xl bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 shadow-2xl p-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Welcome to your dashboard
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
          You have successfully authenticated via OAuth.
        </p>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 mb-8">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 mb-2">
            Signed in as
          </p>
          <p className="font-medium text-slate-900 dark:text-white">
            {userEmail || "Unknown user"}
          </p>
        </div>
        <Button onClick={handleLogout} className="w-full">
          Log out
        </Button>
      </div>
    </div>
  );
}
