import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

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

  console.log(watch("email", "password")); // watch input value by passing the name of it

  return (
    <form
      className="flex flex-col container m-auto mt-20 gap-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <span className="text-red-400 -top-4 relative">
          {errors.password.message}
        </span>
      )}

      <input
        type="submit"
        value="Login"
        className="border bg-violet-500 hover:bg-violet-400 p-4 text-white"
      />
    </form>
  );
}
