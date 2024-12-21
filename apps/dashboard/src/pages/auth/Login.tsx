import { ILoginRequest } from "@ams/core";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/queries/useLogin";

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
      <h1>Login</h1>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <input
          className="border-gray-400 focus:border-black border"
          type="email"
          {...loginForm.register("email")}
        />
        <input
          type="password"
          className="border-gray-400 focus:border-black border"
          {...loginForm.register("password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
