import { ILoginRequest } from "@ams/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useLogin } from "../../hooks/api/auth/useLogin";
import { Button, TextInput } from "@mantine/core";

export const Login = () => {
  const { mutate } = useLogin();
  const loginForm = useForm<ILoginRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginRequest) => {
    mutate(data);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Login</h1>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <div className="my-2">
          <TextInput
            label="Email"
            type="email"
            placeholder="Email"
            {...loginForm.register("email")}
          />
        </div>

        <div className="my-2">
          <TextInput
            label="Password"
            type="password"
            placeholder="Password"
            {...loginForm.register("password")}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <span>
        Don't have account?{" "}
        <Link
          className="text-blue-400 hover:text-blue-600 hover:cursor-pointer"
          to={"/signup"}
        >
          Signup
        </Link>
      </span>
    </div>
  );
};
