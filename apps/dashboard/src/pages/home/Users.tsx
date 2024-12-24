import { Button, Stack } from "@mantine/core";
import { UserTable } from "../../components/user/UserTable";
import { CreateUserModal } from "../../components/user/CreateUserModal";
import { useDisclosure } from "@mantine/hooks";

export const Users = () => {
  const [
    isCreateUserModalOpened,
    { open: openCreateUserModal, close: closeCreateUserModal },
  ] = useDisclosure(false);
  return (
    <>
      <CreateUserModal
        opened={isCreateUserModalOpened}
        onClose={closeCreateUserModal}
      />
      <Stack>
        <Button color="blue" onClick={openCreateUserModal}>
          Create User
        </Button>
        <UserTable />
      </Stack>
    </>
  );
};
