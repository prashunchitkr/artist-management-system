import { useEffect } from "react";
import { useDeleteArtist } from "../../hooks/api/artists/useDeleteArtist";
import { Button, Group, Modal, Text } from "@mantine/core";

interface IDeleteArtistModalProps {
  id: number;
  opened: boolean;
  onClose: () => void;
}

export const DeleteArtistModal = ({
  id,
  opened,
  onClose,
}: IDeleteArtistModalProps) => {
  const deleteArtist = useDeleteArtist();

  useEffect(() => {
    if (deleteArtist.isSuccess) {
      onClose();
    }
  }, [deleteArtist.isSuccess, onClose]);

  const handleDelete = async () => {
    deleteArtist.mutate(id);
  };

  return (
    <Modal title="Delete artist" opened={opened} onClose={onClose}>
      <Text>Are you sure you want to delete this artist?</Text>
      <Group>
        <Button
          onClick={handleDelete}
          color="red"
          loading={deleteArtist.isPending}
        >
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Group>
    </Modal>
  );
};
