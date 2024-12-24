import { Button, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { ArtistTable } from "../../components/artist/ArtistTable";
import { CreateArtistModal } from "../../components/artist/CreateArtistModal";
import { useExportArtists } from "../../hooks/api/artists/useExportArtists";

export const Artists = () => {
  const [
    createArtistModalOpened,
    { open: openCreateArtistModal, close: closeCreteArtistModal },
  ] = useDisclosure(false);

  const exportArtist = useExportArtists();

  useEffect(() => {
    if (exportArtist.data) {
      const url = window.URL.createObjectURL(exportArtist.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "artists.csv";
      a.click();
    }
  }, [exportArtist.data]);

  return (
    <>
      <CreateArtistModal
        opened={createArtistModalOpened}
        onClose={closeCreteArtistModal}
      />
      <Stack>
        <Group gap={"md"}>
          <Button onClick={openCreateArtistModal}>Create Artist</Button>
          <Button color="green">Import Artist</Button>
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
