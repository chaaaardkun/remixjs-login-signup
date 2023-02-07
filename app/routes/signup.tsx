import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="flex flex-col container m-auto mt-20 gap-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <input
        className="border p-4 text-lg outline-none"
        placeholder="First Name"
        {...register("firstName", {
          required: "First Name is required",
        })}
        type="text"
      />
      {errors.firstName && (
        <span className="relative -top-4 text-red-400">
          {errors.firstName.message}
        </span>
      )}
      <input
        className="border p-4 text-lg outline-none"
        placeholder="Last Name"
        {...register("lastName", {
          required: "Last Name is required",
        })}
        type="text"
      />
      {errors.lastName && (
        <span className="relative -top-4 text-red-400">
          {errors.lastName.message}
        </span>
      )}
      <input
        className="border p-4 text-lg outline-none"
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
        <span className="relative -top-4 text-red-400">
          {errors.email.message}
        </span>
      )}
      <input
        className="border p-4 text-lg outline-none"
        placeholder="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      {errors.password && (
        <span className="text-red-400 -top-4 relative">
          {errors.password.message}
        </span>
      )}

      <input
        className="border p-4 text-lg outline-none"
        placeholder="Confirm Password"
        type="password"
        {...register("confirmPass", {
          required: "Confirm Password Required",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
      {errors.confirmPass && (
        <span className="text-red-400 -top-4 relative">
          {errors.confirmPass.message}
        </span>
      )}

      <input
        type="submit"
        value="Sign Up"
        className="border bg-violet-500 hover:bg-violet-400 p-4 text-white"
      />
    </form>
  );
}
