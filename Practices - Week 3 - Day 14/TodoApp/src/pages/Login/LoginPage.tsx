import { useForm, type SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hook/useLogin";
import { LeftColumn } from "./LeftColumn";

interface ILogin {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const { login } = useLogin();
  const apiUrl = "https://server.aptech.io/auth/login";
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password,
        }),
      });

      const result = await response.json()

      if (response.ok) {
        login(result.access_token,result.loggedInUser.email);
        console.log("Login success:", result);
        navigate("/");
      } else {
        toast.error("Đăng nhập thất bại");
        console.error("Login failed:", result.message || result.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <ToastContainer />
      <LeftColumn />
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 md:px-12 py-10">
        <div className="max-w-md w-full mx-auto px-4 md:px-0 space-y-6">
          <p className="font-bold text-blue-300 text-4xl md:text-5xl w-fit mb-10 md:mb-[100px]">
            GROVIA
          </p>
          <h2 className="text-4xl font-bold text-blue-600">Login</h2>
          <p className="text-gray-60 font-bold text-xl">
            Login to your account
          </p>
          <p className="text-gray-500  text-l mb-4">
            Thank you for getting back to Grovia. Let's access our best
            recommendation contact for you.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is requiblue",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email address",
                    },
                    minLength: {
                      value: 5,
                      message: "Email must be at least 5 characters",
                    },
                  })}
                  type="text"
                  placeholder="Email"
                  className="mt-1 w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && (
                  <p className="text-blue-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is requiblue",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    !/\s/.test(value) || "Password must not contain spaces",
                })}
                type="password"
                placeholder="Password"
                className="mt-1 w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Reset Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition"
            >
              SIGN IN
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account yet?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Join Grovia Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
