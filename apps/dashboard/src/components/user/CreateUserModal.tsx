import { Gender, ICreateUserRequest, Role } from "@ams/core";
import { Button, Group, Input, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks/api/users/useCreateUser";
import { useEffect } from "react";

type UserCreateForm = ICreateUserRequest & {
  confirm_password: string;
};

interface ICreateUserModalProps {
  opened: boolean;
  onClose: () => void;
}

// TODO: Reuse signup/update user form
export const CreateUserModal = ({ opened, onClose }: ICreateUserModalProps) => {
  const createUser = useCreateUser();
  const userCreateForm = useForm<UserCreateForm>({
    defaultValues: {
      phone: null,
      address: null,
      dob: null,
    },
  });

  const onSubmit = (data: UserCreateForm) => {
    if (data.password !== data.confirm_password) {
      return userCreateForm.setError("confirm_password", {
        message: "Password does not match",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...rest } = userCreateForm.getValues();
    createUser.mutate(rest);
  };

  useEffect(() => {
    if (createUser.isSuccess) {
      onClose();
    }
  }, [createUser.isSuccess, onClose]);

  return (
    <Modal opened={opened} onClose={onClose} title="Create User">
      <form onSubmit={userCreateForm.handleSubmit(onSubmit)}>
        <Stack gap="md" mb={10}>
          <TextInput
            label="First Name"
            {...userCreateForm.register("first_name", { required: true })}
          />
          <TextInput
            label="Last Name"
            {...userCreateForm.register("last_name", { required: true })}
          />
          <TextInput
            label="Email"
            type="email"
            {...userCreateForm.register("email", {
              required: true,
            })}
          />
          <TextInput
            label="Password"
            type="password"
            {...userCreateForm.register("password", {
              required: true,
            })}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            {...userCreateForm.register("confirm_password", { required: true })}
          />
          <TextInput label="Phone" {...userCreateForm.register("phone")} />
          <TextInput label="Address" {...userCreateForm.register("address")} />
          <TextInput
            label="Date of Birth"
            type="date"
            {...userCreateForm.register("dob")}
          />
          <Input.Wrapper label="Gender">
            <Input
              component="select"
              pointer
              {...userCreateForm.register("gender", { required: true })}
            >
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
              <option value={Gender.Other}>Other</option>
            </Input>
          </Input.Wrapper>
          <Input.Wrapper label="Role">
            <Input
              component="select"
              pointer
              {...userCreateForm.register("role", { required: true })}
            >
              <option value={Role.SuperAdmin}>Super Admin</option>
              <option value={Role.ArtistManager}>Artist Manager</option>
              <option value={Role.Artist}>Artist</option>
            </Input>
          </Input.Wrapper>
        </Stack>

        <Group>
          <Button type="submit" disabled={createUser.isPending}>
            Create
          </Button>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
