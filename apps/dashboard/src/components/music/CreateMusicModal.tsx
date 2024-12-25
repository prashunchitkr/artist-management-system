import { Genre, ICreateMusicRequest } from "@ams/core";
import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useCreateMusic } from "../../hooks/api/music/useCreateMusic";
import { useEffect } from "react";

interface ICreateMusicModalProps {
  artistId: number;
  opened: boolean;
  onClose: () => void;
}

export const CreateMusicModal = ({
  artistId,
  opened,
  onClose,
}: ICreateMusicModalProps) => {
  const createMusic = useCreateMusic(artistId);
  const createMusicForm = useForm<ICreateMusicRequest>({
    defaultValues: {
      artist_id: artistId,
      album_name: null,
    },
  });

  const onSubmit = (data: ICreateMusicRequest) => {
    createMusic.mutate(data);
  };

  useEffect(() => {
    if (createMusic.isSuccess) {
      createMusicForm.reset();
      onClose();
    }
  }, [createMusic.isSuccess, createMusicForm, onClose]);

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={createMusicForm.handleSubmit(onSubmit)}>
        <Stack gap={"md"} mb={10}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Enter title"
            {...createMusicForm.register("title", { required: true })}
          />

          <TextInput
            label="Album Name"
            placeholder="Enter album name"
            {...createMusicForm.register("album_name")}
          />

          <Select
            withAsterisk
            label="Genre"
            placeholder="Select genre"
            data={[
              { value: Genre.Rock, label: "Rock" },
              { value: Genre.Classic, label: "Classic" },
              { value: Genre.Rnb, label: "RnB" },
              { value: Genre.Country, label: "Country" },
              { value: Genre.Jazz, label: "Jazz" },
            ]}
            {...createMusicForm.register("genre", { required: true })}
            onChange={(_value, option) =>
              createMusicForm.setValue("genre", option.value)
            }
          />
        </Stack>

        <Group>
          <Button type="submit" loading={createMusic.isPending}>
            Create Music
          </Button>
          <Button onClick={onClose} color="red">
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
