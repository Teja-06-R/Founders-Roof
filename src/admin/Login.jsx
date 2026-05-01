import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("login"); // "login" | "forgot"
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true); setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) { setError("Enter your email address first"); return; }
    setLoading(true); setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch {
      setError("Could not send reset email. Check the address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Founders <span className="text-orange-500">Roof</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {view === "login" ? "Admin Panel" : "Reset your password"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {view === "login" ? (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Welcome back
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="admin@foundersroof.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-3 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="mt-6 w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100 transition hover:bg-orange-600 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                onClick={() => { setView("forgot"); setError(""); }}
                className="mt-4 w-full text-center text-xs text-gray-400 hover:text-orange-500 transition"
              >
                Forgot password?
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Reset password
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Enter your email and we'll send a reset link.
              </p>

              {resetSent ? (
                <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-4 text-center">
                  <p className="text-sm font-medium text-green-700">Reset link sent!</p>
                  <p className="text-xs text-green-500 mt-1">Check your inbox and follow the link.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="admin@foundersroof.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                    />
                  </div>

                  {error && (
                    <p className="mt-3 text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handleReset}
                    disabled={loading}
                    className="mt-6 w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white shadow-md shadow-orange-100 transition hover:bg-orange-600 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </>
              )}

              <button
                onClick={() => { setView("login"); setError(""); setResetSent(false); }}
                className="mt-4 w-full text-center text-xs text-gray-400 hover:text-orange-500 transition"
              >
                ← Back to login
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">
          Founders Roof Admin · Secure Access
        </p>
      </div>
    </div>
  );
}