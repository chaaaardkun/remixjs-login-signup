import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
import Cookies from "js-cookie";

type Inputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export async function loader() {
  return {
    ENV: {
      API_ENDPOINT: process.env.API_ENDPOINT,
      SECRET_KEY: process.env.SECRET_KEY,
    },
  };
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const env = useLoaderData<typeof loader>() as any;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post(env.ENV.API_ENDPOINT + "registration", data);

      /* TODO: 
        replace to redirect
      */
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

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
            {...register("first_name", {
              required: "First Name is required",
            })}
            type="text"
          />
          {errors.first_name && (
            <span className="relative text-red-400">
              {errors.first_name.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            className="w-full border p-4 text-lg outline-none"
            placeholder="Last Name"
            {...register("last_name", {
              required: "Last Name is required",
            })}
            type="text"
          />
          {errors.last_name && (
            <span className="relative text-red-400">
              {errors.last_name.message}
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
            {...register("password_confirmation", {
              required: "Confirm password is required",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.password_confirmation && (
            <span className="text-red-400 relative">
              {errors.password_confirmation.message}
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
        <div className="m-auto">
          <span className="text-sm">Got an account? </span>
          <a
            href="/"
            className="m-auto text-sm text-blue-300 hover:text-blue-200"
          >
            Sign in.
          </a>
        </div>
      </form>
    </div>
  );
}
