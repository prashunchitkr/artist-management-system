import { Button, Stack } from "@mantine/core";
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
