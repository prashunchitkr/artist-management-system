import { ILoginRequest } from "@ams/core";
import { Button, Container, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useLogin } from "../../hooks/api/auth/useLogin";

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
    <Container size="sm">
      <Title>Login</Title>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <Stack gap={"md"}>
          <TextInput
            label="Email"
            type="email"
            placeholder="Email"
            {...loginForm.register("email")}
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="Password"
            {...loginForm.register("password")}
          />
          <Button type="submit">Login</Button>
        </Stack>
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
    </Container>
  );
};
