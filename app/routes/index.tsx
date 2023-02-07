import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

export default function Index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [togglePassword, setTogglePassword] = useState(false);

  /* TODO
   *** convert to input and validation to component for cleaner code and reusability
   */

  return (
    <div>
      <img
        src="https://doconchain.com/static/media/DoconchainlogoV2.49aead5be0245e0467c1.png"
        alt="logo"
        className="m-auto h-12 mt-10"
      />
      <form
        className="flex flex-col container m-auto mt-10 gap-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
            <span className="relative  text-red-400">
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
            })}
          />
          <span
            onClick={() => setTogglePassword(!togglePassword)}
            className="text-xs text-blue-300 hover:text-blue-200  absolute right-4 top-5 cursor-pointer"
          >
            Show
          </span>
          {errors.password && (
            <span className="text-red-400  relative">
              {errors.password.message}
            </span>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className="border bg-violet-500 hover:bg-violet-400 p-4 text-white"
        />

        <a
          href="/signup"
          className="m-auto text-sm text-blue-300 hover:text-blue-200"
        >
          No Account Yet? Sign Up.
        </a>
      </form>
    </div>
  );
}
