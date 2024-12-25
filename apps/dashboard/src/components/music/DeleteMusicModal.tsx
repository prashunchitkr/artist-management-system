import { Button, Group, Modal, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDeleteMusic } from "../../hooks/api/music/useDeleteMusic";

interface IDeleteMusicModalProps {
  id: number;
  artistId: number;
  opened: boolean;
  onClose: () => void;
}

export const DeleteMusicModal = ({
  id,
  artistId,
  opened,
  onClose,
}: IDeleteMusicModalProps) => {
  const deleteMusic = useDeleteMusic(artistId);

  useEffect(() => {
    if (deleteMusic.isSuccess) {
      onClose();
    }
  }, [deleteMusic.isSuccess, onClose]);

  const handleDelete = async () => {
    deleteMusic.mutate(id);
  };

  return (
    <Modal title="Delete music" opened={opened} onClose={onClose}>
      <Text>Are you sure you want to delete this music?</Text>
      <Group>
        <Button
          onClick={handleDelete}
          color="red"
          loading={deleteMusic.isPending}
        >
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Group>
    </Modal>
  );
};
