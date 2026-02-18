import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface SigninForm {
  mobile: string;
  password: string;
}

const Signin = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  //   useEffect(() => {
  //   if (isAuth) {
  //     navigate("/", { replace: true });
  //   }
  // }, [isAuth, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>({
    mode: "onBlur",
  });

  // const onSubmit = async (data: SigninForm) => {
  //   try {
  //     toast.loading("Signing in...", { toastId: "login" });

  //     await login(data.mobile, data.password);

  //     toast.dismiss("login");
  //     toast.success("Login successful");

  //     setTimeout(() => {
  //       navigate("/", { replace: true });
  //     }, 1000);
  //   } catch (err: any) {
  //     toast.dismiss("login");
  //     toast.error(err?.message || "Invalid credentials", {
  //       theme: "colored",
  //     });
  //   }
  // };

  const onSubmit = async (data: SigninForm) => {
    try {
      await login(data.mobile, data.password);

      // ✅ redirect on success
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 800);
    } catch {
      // ❌ Error toast already handled in AuthProvider
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center -mt-14 mb-4">
          <img
            src="/nanma.png"
            alt="Nanma"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>

        <h2 className="text-center text-xl font-semibold mb-6 text-[#8e2d25]">Sign-In</h2>

        {/* FORM */}
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          {/* 🔒 AUTOFILL PREVENTION (DO NOT REMOVE) */}
          <input
            type="text"
            name="fake-username"
            autoComplete="username"
            style={{ display: "none" }}
          />
          <input
            type="password"
            name="fake-password"
            autoComplete="new-password"
            style={{ display: "none" }}
          />

          {/* MOBILE */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>

            <input
              type="tel"
              autoComplete="off"
              disabled={isSubmitting}
              placeholder="Enter mobile number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm
                focus:outline-none focus:ring-2
                ${
                  errors.mobile
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:ring-sky-200"
                } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""} `}
            />

            {errors.mobile && (
              <p className="mt-1 text-xs text-red-500">
                {errors.mobile.message}
              </p>
            )}
          </div>

     

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                disabled={isSubmitting}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
        focus:outline-none focus:ring-2
        ${
          errors.password
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:ring-sky-200"
        } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />

              {/* 👁 SHOW / HIDE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 disabled:opacity-50 "
                tabIndex={-1}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* <div className="text-right mb-4">
            <button
              type="button"
              onClick={() => navigate("/signin/change-password")}
              className="text-xs text-[#8e2d25] hover:underline"
            >
              Forgot password?
            </button>
          </div> */}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
           w-full flex items-center justify-center gap-2
           rounded-lg py-2.5 text-sm font-semibold text-white
           transition-all duration-300
           ${
             isSubmitting
               ? "bg-gray-400 cursor-not-allowed"
               : "bg-[#8e2d25] hover:bg-[#b91c1c]"
           }
           `}
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={1200} />
    </div>
  );
};

export default Signin;
