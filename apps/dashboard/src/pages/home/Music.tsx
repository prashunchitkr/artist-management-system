import { Button, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateMusicModal } from "../../components/music/CreateMusicModal";
import { MusicTable } from "../../components/music/MusicTable";
import { useAuth } from "../../contexts/AuthContext";

export const Music = () => {
  const user = useAuth();

  const [
    createMusicModalOpened,
    { open: openCreateMusicModal, close: closeCreateMusicModal },
  ] = useDisclosure(false);

  if (!user?.artist_id) {
    return (
      <Text>
        You do not have an artist profile associated with your account. Please
        contact the administrator.
      </Text>
    );
  }

  return (
    <>
      <CreateMusicModal
        artistId={user!.artist_id!}
        opened={createMusicModalOpened}
        onClose={closeCreateMusicModal}
      />
      <Stack>
        <Button onClick={openCreateMusicModal}>Create Music</Button>
        <MusicTable />
      </Stack>
    </>
  );
};
