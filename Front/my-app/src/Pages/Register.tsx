import { useState } from "react";
import authService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import type { RegisterCredentials } from "../Models/AuthResponse";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterCredentials>({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await authService.register(form);

      console.log(user);

      navigate("/login");
    } catch (err:any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-10">

          <h1 className="text-3xl font-semibold tracking-tight text-black">
            Code Ponder
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Secure code review platform
          </p>

        </div>


        {/* Register Card */}
        <div className="border border-gray-200 rounded-2xl p-8 bg-white">

          <div className="mb-8">

            <h2 className="text-2xl font-semibold text-black">
              Create your account
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Join Code Ponder and start reviewing code
            </p>

          </div>


          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            {/* Username */}
            <div>

              <label className="block text-sm font-medium text-black mb-2">
                Username
              </label>

              <input
                type="text"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
                placeholder="JohnDoe"
                required
                className="
                  w-full
                  bg-white
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-black
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-1
                  focus:ring-black
                "
              />

            </div>


            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-black mb-2">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                placeholder="john@example.com"
                required
                className="
                  w-full
                  bg-white
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-black
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-1
                  focus:ring-black
                "
              />

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>

              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                placeholder="••••••••"
                required
                className="
                  w-full
                  bg-white
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-black
                  placeholder-gray-400
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-1
                  focus:ring-black
                "
              />

            </div>


            {/* Register Button */}
            <button
              type="submit"
              className="
                w-full
                bg-black
                hover:bg-gray-800
                transition
                text-white
                font-medium
                py-3
                rounded-lg
              "
            >
              Create account
            </button>

          </form>


          {/* Login */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-black font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>

          </div>

        </div>


        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure • Private • Reliable
        </p>

      </div>

    </div>
  );
}
