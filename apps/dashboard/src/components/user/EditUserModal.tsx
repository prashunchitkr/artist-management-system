import { Button, Group, Input, Modal, Stack, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Gender, IUpdateUserRequest, IUserResponse, Role } from "@ams/core";
import { useUpdateUser } from "../../hooks/api/users/useUpdateUser";

interface IEditUserModalProps {
  opened: boolean;
  onClose: () => void;
  user: IUserResponse;
}

export const EditUserModal = ({
  opened,
  onClose,
  user,
}: IEditUserModalProps) => {
  const updateUser = useUpdateUser();
  const editUserForm = useForm<IUpdateUserRequest>({
    defaultValues: user,
  });

  const onSubmit = (data: IUpdateUserRequest) => {
    const dataToUpdate: IUpdateUserRequest = {
      ...data,
      password: data.password || undefined,
    };
    updateUser.mutate({ id: user.id, data: dataToUpdate });
  };

  useEffect(() => {
    if (updateUser.isSuccess) {
      onClose();
    }
  }, [updateUser.isSuccess, onClose]);

  useEffect(() => {
    editUserForm.reset(user);
  }, [user, editUserForm]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit User">
      <form onSubmit={editUserForm.handleSubmit(onSubmit)}>
        <Stack gap="md" mb={10}>
          <TextInput
            label="First Name"
            {...editUserForm.register("first_name", {
              required: true,
              maxLength: 255,
            })}
          />

          <TextInput
            label="Last Name"
            {...editUserForm.register("last_name", {
              required: true,
              maxLength: 255,
            })}
          />

          <TextInput
            label="Email"
            type="email"
            {...editUserForm.register("email", { required: true })}
          />

          <TextInput
            label="Password"
            type="password"
            {...editUserForm.register("password", { minLength: 8 })}
          />

          <TextInput
            label="Phone"
            {...editUserForm.register("phone", { maxLength: 20 })}
          />

          <TextInput
            label="Address"
            {...editUserForm.register("address", {
              maxLength: 255,
            })}
          />

          <TextInput
            label="Date of Birth"
            type="date"
            {...editUserForm.register("dob", { valueAsDate: true })}
          />

          <Input.Wrapper label="Gender">
            <Input
              component="select"
              defaultValue={user.gender}
              pointer
              {...editUserForm.register("gender")}
            >
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
              <option value={Gender.Other}>Other</option>
            </Input>
          </Input.Wrapper>

          <Input.Wrapper label="Role">
            <Input
              component="select"
              defaultValue={user.role}
              pointer
              {...editUserForm.register("role")}
            >
              <option value={Role.SuperAdmin}>Super Admin</option>
              <option value={Role.ArtistManager}>Artist Manager</option>
              <option value={Role.Artist}>Artist</option>
            </Input>
          </Input.Wrapper>
        </Stack>

        <Group gap="sm">
          <Button type="submit" loading={updateUser.isPending}>
            Submit
          </Button>
          <Button onClick={onClose} variant="light">
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
