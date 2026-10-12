import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Services/AuthService";
import useNotification from "../Hooks/NotificationHook";
import type { LoginCredentials } from "../Models/AuthResponse";

export default function Login() {
  const navigate = useNavigate();

  const handleNotification = () => console.log("object");
  const { connect } = useNotification(handleNotification);

  const [form, setForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await authService.login(form);

      if (result) {
        localStorage.setItem("user", JSON.stringify(result));

        connect();
        navigate("/repositories");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6">

      <div className="w-full max-w-[420px]">

     


        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="
            text-2xl
            font-semibold
            tracking-tight
            text-gray-900
          ">
            Sign in or sign up
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Continue to your developer workspace
          </p>

        </div>


        {/* Authentication */}
        <div>

          {/* Google */}
          <button
            type="button"
            className="
              w-full
              h-12
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-900
              text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-3
              hover:bg-gray-50
              transition
            "
          >

            {/* Google icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.21 2.91-7.26z"
              />

              <path
                fill="#34A853"
                d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.7z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 13.78A5.86 5.86 0 0 1 6.23 12c0-.62.11-1.22.31-1.78V7.69H3.3A9.72 9.72 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.31l3.24-2.53z"
              />

              <path
                fill="#EA4335"
                d="M12 6.19c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.29 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.7 5.39l3.24 2.53C7.31 7.91 9.46 6.19 12 6.19z"
              />
            </svg>

            Continue with Google

          </button>


          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-gray-200 flex-1" />

            <span className="text-xs text-gray-400">
              or continue with
            </span>

            <div className="h-px bg-gray-200 flex-1" />

          </div>


          {/* Email / Password */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Email */}
            <div>

              <label className="
                block
                text-sm
                font-medium
                text-gray-800
                mb-2
              ">
                Email
              </label>

              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  text-sm
                  text-gray-900
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />

            </div>


            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="
                  text-sm
                  font-medium
                  text-gray-800
                ">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    text-xs
                    text-gray-500
                    hover:text-gray-900
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  text-sm
                  text-gray-900
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-gray-900
                  focus:ring-1
                  focus:ring-gray-900
                "
              />

            </div>


            {/* Error */}
            {error && (
              <div className="
                rounded-lg
                bg-red-50
                border
                border-red-200
                px-4
                py-3
                text-sm
                text-red-600
              ">
                {error}
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-12
                rounded-lg
                bg-black
                text-white
                text-sm
                font-medium
                hover:bg-gray-800
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing in..." : "Continue with Email"}
            </button>

          </form>

        </div>


        {/* Register */}
        <div className="text-center mt-7">

          <p className="text-sm text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-gray-900
                font-medium
                hover:underline
              "
            >
              Create one
            </Link>

          </p>

        </div>


        {/* Legal */}
        <p className="
          text-center
          text-xs
          leading-5
          text-gray-400
          mt-8
          max-w-sm
          mx-auto
        ">
          By continuing, you agree to the Code Ponder{" "}
          <Link
            to="/terms"
            className="underline hover:text-gray-600"
          >
            Terms of Use
          </Link>{" "}
          and acknowledge the{" "}
          <Link
            to="/privacy"
            className="underline hover:text-gray-600"
          >
            Privacy Policy
          </Link>.
        </p>

      </div>

    </div>
  );
}
