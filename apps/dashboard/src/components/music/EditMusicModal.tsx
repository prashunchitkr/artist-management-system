import { Genre, IMusicResponse, IUpdateMusicRequest } from "@ams/core";
import { useUpdateMusic } from "../../hooks/api/music/useUpdateMusic";
import { useForm } from "react-hook-form";
import { Button, Group, Modal, Select, Stack, TextInput } from "@mantine/core";
import { useEffect } from "react";

interface IEditMusicModalProps {
  music: IMusicResponse;
  opened: boolean;
  onClose: () => void;
}

export const EditMusicModal = ({
  music,
  opened,
  onClose,
}: IEditMusicModalProps) => {
  const updateMusic = useUpdateMusic(music.artist_id);
  const updateMusicForm = useForm<IUpdateMusicRequest>({
    defaultValues: music,
  });

  const onSubmit = (data: IUpdateMusicRequest) => {
    updateMusic.mutate({ id: music.id, data });
  };

  useEffect(() => {
    if (updateMusic.isSuccess) {
      updateMusicForm.reset();
      onClose();
    }
  }, [updateMusic.isSuccess, updateMusicForm, onClose]);

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Music">
      <form onSubmit={updateMusicForm.handleSubmit(onSubmit)}>
        <Stack gap={"md"} mb={10}>
          <TextInput
            withAsterisk
            label="Title"
            placeholder="Enter title"
            {...updateMusicForm.register("title", { required: true })}
          />

          <TextInput
            label="Album Name"
            placeholder="Enter album name"
            {...updateMusicForm.register("album_name")}
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
            {...updateMusicForm.register("genre", { required: true })}
            onChange={(_value, option) =>
              updateMusicForm.setValue("genre", option.value)
            }
          />
        </Stack>

        <Group>
          <Button type="submit" loading={updateMusic.isPending}>
            Update
          </Button>
          <Button onClick={onClose} color="red">
            Cancel
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
