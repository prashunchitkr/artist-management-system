import { Button, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { ArtistTable } from "../../components/artist/ArtistTable";
import { CreateArtistModal } from "../../components/artist/CreateArtistModal";
import { useExportArtists } from "../../hooks/api/artists/useExportArtists";
import { downloadFile } from "../../utils/download-file";
import { ImportArtistModal } from "../../hooks/api/artists/importArtistModal";

export const Artists = () => {
  const [
    createArtistModalOpened,
    { open: openCreateArtistModal, close: closeCreteArtistModal },
  ] = useDisclosure(false);

  const [
    isImportArtistModalOpened,
    { open: openImportArtistsModal, close: closeCreateUserModal },
  ] = useDisclosure(false);

  const exportArtist = useExportArtists();

  useEffect(() => {
    if (exportArtist.data) downloadFile(exportArtist.data);
  }, [exportArtist.data]);

  return (
    <>
      <CreateArtistModal
        opened={createArtistModalOpened}
        onClose={closeCreteArtistModal}
      />
      <ImportArtistModal
        opened={isImportArtistModalOpened}
        onClose={closeCreateUserModal}
      />
      <Stack>
        <Group gap={"md"}>
          <Button onClick={openCreateArtistModal}>Create Artist</Button>
          <Button color="green" onClick={openImportArtistsModal}>
            Import Artist
          </Button>
          <Button
            color="grape"
            onClick={() => exportArtist.refetch()}
            loading={exportArtist.isLoading}
          >
            Export Artist
          </Button>
        </Group>
        <ArtistTable />
      </Stack>
    </>
  );
};
