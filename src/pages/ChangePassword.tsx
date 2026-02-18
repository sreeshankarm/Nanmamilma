import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePasswordApi } from "../api/auth.api";
import { ToastContainer } from "react-toastify";


interface ChangePasswordForm {
  existingpassword: string;
  password: string;
  password_confirmation: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({
    mode: "onBlur",
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await changePasswordApi(data);
      toast.success("Password changed successfully");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (err: any) {
      if (err?.response?.data?.invalidexistingpassword) {
        toast.error("Current password is incorrect");
      } else if (err?.response?.data?.errors?.password) {
        toast.error(err.response.data.errors.password[0]);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-center -mt-14 mb-4">
          <img
            src="/nanma.png"
            alt="Nanma"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>

        <h2 className="text-center text-xl font-semibold mb-6 text-[#8e2d25]">
          Change-Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* CURRENT PASSWORD */}
          <div className="mb-4">
            <label className="text-sm font-medium">Current Password</label>
            <div className="relative mt-1">
              <input
                type={show.old ? "text" : "password"}
                placeholder="Current Password"
                {...register("existingpassword", {
                  required: "Current password is required",
                })}
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
                ${
                  errors.existingpassword ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {show.old ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.existingpassword && (
              <p className="text-xs text-red-500">
                {errors.existingpassword.message}
              </p>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="mb-4">
            <label className="text-sm font-medium">New Password</label>
            <div className="relative mt-1">
              <input
                type={show.new ? "text" : "password"}
                placeholder="New Password"
                {...register("password", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Max 20 characters",
                  },
                })}
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
                ${errors.password ? "border-red-400" : "border-gray-300"}`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {show.new ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6">
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <input
                type={show.confirm ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("password_confirmation", {
                  required: "Confirm password is required",
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match",
                })}
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm
                ${
                  errors.password_confirmation
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {show.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-xs text-red-500">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

    

          <div className="flex gap-3">
            {/* CANCEL */}
            <button
              type="button"
              onClick={() => navigate("/signin")}
              disabled={isSubmitting}
              className={`
      w-1/2 rounded-lg py-2.5 text-sm font-semibold
      border border-gray-300 text-gray-700
      hover:bg-gray-100 transition
      ${isSubmitting ? "cursor-not-allowed opacity-60" : ""}
    `}
            >
              Cancel
            </button>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
      w-1/2 rounded-lg py-2.5 text-sm font-semibold text-white
      transition
      ${
        isSubmitting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#8e2d25] hover:bg-[#b91c1c]"
      }
    `}
            >
              {isSubmitting ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
            <ToastContainer position="top-right" autoClose={1200} />

    </div>
  );
};

export default ChangePassword;
