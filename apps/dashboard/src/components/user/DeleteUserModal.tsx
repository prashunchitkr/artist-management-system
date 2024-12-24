import { Button, Group, Modal, Text } from "@mantine/core";
import { useDeleteUser } from "../../hooks/api/users/useDeleteUser";
import { useEffect } from "react";

interface IDeleteUserModalProps {
  id: number;
  opened: boolean;
  onClose: () => void;
}

export const DeleteUserModal = ({
  id,
  opened,
  onClose,
}: IDeleteUserModalProps) => {
  const deleteUser = useDeleteUser();

  useEffect(() => {
    if (deleteUser.isSuccess) {
      onClose();
    }
  }, [deleteUser.isSuccess, onClose]);

  const handleDelete = async () => {
    deleteUser.mutate(id);
  };

  return (
    <Modal title="Delete user" opened={opened} onClose={onClose}>
      <Text>Are you sure you want to delete this user?</Text>
      <Group>
        <Button
          onClick={handleDelete}
          color="red"
          loading={deleteUser.isPending}
        >
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Group>
    </Modal>
  );
};
