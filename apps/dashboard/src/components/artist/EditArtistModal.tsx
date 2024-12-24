import {
  Gender,
  IArtistResponse,
  ICreateArtistRequest,
  IUpdateArtistRequest,
} from "@ams/core";
import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateArtist } from "../../hooks/api/artists/useUpdateArtist";
import { useFindUnassignedArtistUsers } from "../../hooks/api/users/useFindUnassignedArtistUsers";

interface IEditArtistModalProps {
  opened: boolean;
  onClose: () => void;
  artist: IArtistResponse;
}

export const EditArtistModal = ({
  opened,
  onClose,
  artist,
}: IEditArtistModalProps) => {
  const updateArtist = useUpdateArtist();
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

  const editArtistForm = useForm<IUpdateArtistRequest>({
    defaultValues: artist,
  });

  const onSubmit = (data: IUpdateArtistRequest) => {
    updateArtist.mutate({ id: artist.id, data });
  };

  useEffect(() => {
    if (updateArtist.isSuccess) {
      editArtistForm.reset();
      onClose();
    }
  }, [updateArtist.isSuccess, editArtistForm, onClose]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Artist">
      <form onSubmit={editArtistForm.handleSubmit(onSubmit)}>
        <Stack gap={"md"} mb={10}>
          <TextInput
            withAsterisk
            label="Name"
            {...editArtistForm.register("name", {
              required: true,
              maxLength: 255,
            })}
          />

          <Select
            withAsterisk
            label="Gender"
            placeholder="Select a gender"
            data={genderOptions}
            {...editArtistForm.register("gender", { required: true })}
            onChange={(_value, option) => {
              editArtistForm.setValue("gender", option.value);
            }}
          />

          <Select
            label="User"
            placeholder="Select a user"
            withAsterisk
            limit={10}
            data={userOptions}
            {...editArtistForm.register("user_id", {
              required: true,
            })}
            onChange={(_value, option) => {
              editArtistForm.setValue("user_id", parseInt(option.value));
            }}
          />

          <TextInput
            label="Date of Birth"
            type="date"
            {...editArtistForm.register("dob", {
              valueAsDate: true,
            })}
          />

          <TextInput
            label="Address"
            placeholder="Address"
            {...editArtistForm.register("address")}
          />

          <TextInput
            label="First Release Year"
            type="number"
            {...editArtistForm.register("first_release_year", {
              min: 0,
              max: new Date().getFullYear(),
            })}
          />

          <TextInput
            label="No. of Albums Released"
            type="number"
            {...editArtistForm.register("no_of_albums_released", {
              min: 0,
            })}
          />
        </Stack>

        <Group>
          <Button type="submit" loading={updateArtist.isPending}>
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
