import { Gender, ISignupRequest } from "@ams/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import { InputGroup, SelectInput, TextInput } from "../../components/ui/Input";
import { useSignup } from "../../hooks/queries/useSignUp";

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
      signupForm.setError("confirm_password", {
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
        <InputGroup>
          <TextInput
            placeholder="First Name"
            required
            {...signupForm.register("first_name")}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Last Name"
            required
            {...signupForm.register("last_name")}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            required
            placeholder="Email"
            {...signupForm.register("email")}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Password"
            type="password"
            required
            {...signupForm.register("password", { minLength: 8 })}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Confirm Password"
            type="password"
            required
            {...signupForm.register("confirm_password", { minLength: 8 })}
          />
          {signupForm.formState.errors.confirm_password && (
            <span className="text-red-400">
              {signupForm.formState.errors.confirm_password.message}
            </span>
          )}
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Phone"
            {...signupForm.register("phone", {
              required: false,
            })}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Address"
            {...signupForm.register("address", {
              required: false,
            })}
          />
        </InputGroup>

        <InputGroup>
          <TextInput
            placeholder="Date of Birth"
            type="date"
            {...signupForm.register("dob", {
              required: false,
              valueAsDate: true,
            })}
          />
        </InputGroup>

        <InputGroup>
          <SelectInput
            values={[
              [Gender.Male, "Male"],
              [Gender.Female, "Female"],
              [Gender.Other, "Other"],
            ]}
            {...signupForm.register("gender")}
          />
        </InputGroup>

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
