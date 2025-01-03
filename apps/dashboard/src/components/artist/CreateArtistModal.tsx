import { Gender, ICreateArtistRequest } from "@ams/core";
import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateArtist } from "../../hooks/api/artists/useCreateArtist";
import { useFindUnassignedArtistUsers } from "../../hooks/api/users/useFindUnassignedArtistUsers";

type CreateArtistForm = ICreateArtistRequest;

interface ICreateArtistModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateArtistModal = ({
  opened,
  onClose,
}: ICreateArtistModalProps) => {
  const createArtist = useCreateArtist();
  const unassignedArtistUsers = useFindUnassignedArtistUsers();

  const userOptions =
    unassignedArtistUsers.data?.map((user) => ({
      value: String(user.id),
      label: user.name,
    })) || [];

  const genderOptions = [
    {
      label: "Male",
      value: Gender.Male,
    },
    {
      label: "Female",
      value: Gender.Female,
    },
    {
      label: "Other",
      value: Gender.Other,
    },
  ];

  const createArtistForm = useForm<CreateArtistForm>({
    defaultValues: {
      dob: null,
      address: null,
      first_release_year: 0,
      no_of_albums_released: 0,
    },
  });

  const onSubmit = (data: CreateArtistForm) => {
    createArtist.mutate(data);
  };

  useEffect(() => {
    if (createArtist.isSuccess) {
      createArtistForm.reset();
      onClose();
    }
  }, [createArtist.isSuccess, onClose, createArtistForm]);

  return (
    <Modal opened={opened} onClose={onClose} title="Create Artist">
      <form onSubmit={createArtistForm.handleSubmit(onSubmit)}>
        <Stack gap="md" mb={10}>
          <TextInput
            withAsterisk
            label="Name"
            {...createArtistForm.register("name", {
              required: true,
              maxLength: 255,
            })}
          />

          <Select
            withAsterisk
            label="Gender"
            placeholder="Select a gender"
            data={genderOptions}
            {...createArtistForm.register("gender", { required: true })}
            onChange={(_value, option) => {
              createArtistForm.setValue("gender", option.value);
            }}
          />

          <Select
            label="User"
            placeholder="Select a user"
            withAsterisk
            limit={10}
            data={userOptions}
            {...createArtistForm.register("user_id", {
              required: true,
            })}
            onChange={(_value, option) => {
              createArtistForm.setValue("user_id", parseInt(option.value));
            }}
          />

          <TextInput
            label="Date of Birth"
            type="date"
            {...createArtistForm.register("dob", { valueAsDate: true })}
          />

          <TextInput
            label="Address"
            placeholder="Address"
            {...createArtistForm.register("address")}
          />

          <TextInput
            label="First Release Year"
            type="number"
            {...createArtistForm.register("first_release_year", {
              min: 0,
              max: new Date().getFullYear(),
            })}
          />

          <TextInput
            label="No. of Albums Released"
            type="number"
            {...createArtistForm.register("no_of_albums_released", {
              min: 0,
            })}
          />
        </Stack>

        <Group>
          <Button type="submit" loading={createArtist.isPending}>
            Create
          </Button>
          <Button color="red" onClick={onClose}>
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
