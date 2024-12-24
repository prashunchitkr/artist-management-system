import { Button, Stack } from "@mantine/core";
import { ArtistTable } from "../../components/artist/ArtistTable";
import { useDisclosure } from "@mantine/hooks";
import { CreateArtistModal } from "../../components/artist/CreateArtistModal";

export const Artists = () => {
  const [
    createArtistModalOpened,
    { open: openCreateArtistModal, close: closeCreteArtistModal },
  ] = useDisclosure(false);
  return (
    <>
      <CreateArtistModal
        opened={createArtistModalOpened}
        onClose={closeCreteArtistModal}
      />
      <Stack>
        <Button onClick={openCreateArtistModal}>Create Artist</Button>
        <ArtistTable />
      </Stack>
    </>
  );
};
