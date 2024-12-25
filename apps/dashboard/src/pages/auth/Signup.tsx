import { Gender, ISignupRequest } from "@ams/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useSignup } from "../../hooks/api/auth/useSignUp";
import { Button, Input, TextInput } from "@mantine/core";

type SignupForm = ISignupRequest & {
  confirm_password: string;
};

export const Signup = () => {
  const { mutate } = useSignup();
  const signupForm = useForm<SignupForm>({
    defaultValues: {
      address: null,
      dob: null,
      phone: null,
    },
  });

  const onSubmit = (data: SignupForm) => {
    if (data.password !== data.confirm_password) {
      return signupForm.setError("confirm_password", {
        message: "Password does not match",
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = data;

    mutate(rest);
  };

  return (
    <div>
      <div className="text-3xl font-bold">Signup</div>
      <form onSubmit={signupForm.handleSubmit(onSubmit)}>
        <TextInput
          label="First Name"
          placeholder="First Name"
          required
          {...signupForm.register("first_name")}
        />

        <TextInput
          label="Last Name"
          placeholder="Last Name"
          required
          {...signupForm.register("last_name")}
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          {...signupForm.register("email")}
        />

        <TextInput
          label="Password"
          placeholder="Password"
          type="password"
          required
          {...signupForm.register("password", { minLength: 8 })}
        />

        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          required
          error={signupForm.formState.errors.confirm_password?.message}
          {...signupForm.register("confirm_password", { minLength: 8 })}
        />

        <TextInput
          label="Phone"
          placeholder="Phone"
          {...signupForm.register("phone", {
            required: false,
          })}
        />

        <TextInput
          label="Address"
          placeholder="Address"
          {...signupForm.register("address", {
            required: false,
          })}
        />

        <TextInput
          label="Date of Birth"
          placeholder="Date of Birth"
          type="date"
          {...signupForm.register("dob", {
            required: false,
            valueAsDate: true,
          })}
        />

        <Input.Wrapper label="Gender">
          <Input component="select" pointer {...signupForm.register("gender")}>
            <option value={Gender.Male}>Male</option>
            <option value={Gender.Female}>Female</option>
            <option value={Gender.Other}>Other</option>
          </Input>
        </Input.Wrapper>

        <Button type="submit">Sign Up</Button>
      </form>
      <span>
        Already have an account?{" "}
        <Link
          className="text-blue-400 hover:text-blue-600 hover:cursor-pointer"
          to="/login"
        >
          Login
        </Link>
      </span>
    </div>
  );
};
