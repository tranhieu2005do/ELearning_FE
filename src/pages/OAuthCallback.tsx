import { useEffect, useState } from "react";
import { authApi } from "../services/api";

export function OAuthCallback() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const errorMsg = params.get("error") || params.get("oauth_error");
        const pathname = window.location.pathname;

        if (errorMsg) {
          throw new Error(decodeURIComponent(errorMsg));
        }

        if (code) {
          if (pathname.includes("google")) {
            await authApi.loginWithGoogleCode(code);
          } else if (pathname.includes("facebook")) {
            await authApi.loginWithFacebookCode(code);
          } else {
            throw new Error("Unknown OAuth provider from URL path");
          }

          console.log(`Successfully logged in via OAuth`);

          // Redirect to homepage after OAuth success
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
        } else {
          throw new Error("Missing authentication tokens from OAuth provider");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "OAuth login failed";
        setError(errorMessage);
        setIsProcessing(false);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          window.location.href = `/login?error=${encodeURIComponent(
            errorMessage
          )}`;
        }, 3000);
      }
    };

    processOAuthCallback();
  }, []);

  if (isProcessing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Processing Login
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Redirecting you to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Login Failed
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
