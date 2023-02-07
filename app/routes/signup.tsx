import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  /* TODO
   *** convert to input and validation to component for cleaner code and reusability
   *** create a loop/map for all the inputs
   */

  return (
    <div>
      <img
        src="https://doconchain.com/static/media/DoconchainlogoV2.49aead5be0245e0467c1.png"
        alt="logo"
        className="m-auto h-12 mt-10"
      />
      <form
        className="flex flex-col container m-auto mt-20 gap-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="relative">
          <input
            className="w-full border p-4 text-lg outline-none"
            placeholder="First Name"
            {...register("firstName", {
              required: "First Name is required",
            })}
            type="text"
          />
          {errors.firstName && (
            <span className="relative text-red-400">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            className="w-full border p-4 text-lg outline-none"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last Name is required",
            })}
            type="text"
          />
          {errors.lastName && (
            <span className="relative text-red-400">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            className="w-full border p-4 text-lg outline-none"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
          />
          {errors.email && (
            <span className="relative text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            className="border p-4 text-lg outline-none w-full "
            placeholder="Password"
            type={togglePassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  "Password must contain at least one uppercase, one lowercase, one number and a special character",
              },
            })}
          />
          <span
            onClick={() => setTogglePassword(!togglePassword)}
            className="text-xs text-blue-300 hover:text-blue-200  absolute right-4 top-5 cursor-pointer"
          >
            Show
          </span>
          {errors.password && (
            <span className="text-red-400 relative">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            className="w-full border p-4 text-lg outline-none"
            placeholder="Confirm Password"
            type={toggleConfirmPassword ? "text" : "password"}
            {...register("confirmPass", {
              required: "Confirm password is required",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.confirmPass && (
            <span className="text-red-400 relative">
              {errors.confirmPass.message}
            </span>
          )}

          <span
            onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
            className="text-xs text-blue-300 hover:text-blue-200 absolute right-4 top-5 cursor-pointer"
          >
            Show
          </span>
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="border bg-violet-500 hover:bg-violet-400 p-4 text-white"
        />
        <a
          href="/"
          className="m-auto text-sm text-blue-300 hover:text-blue-200"
        >
          Got an account? Sign in.
        </a>
      </form>
    </div>
  );
}
