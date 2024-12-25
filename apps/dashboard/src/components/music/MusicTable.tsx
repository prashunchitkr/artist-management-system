import { IMusicResponse } from "@ams/core";
import { ActionIcon, Group } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGetArtistMusic } from "../../hooks/api/music/useGetArtistMusic";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeleteMusicModal } from "./DeleteMusicModal";

const MusicTableActions = (music: IMusicResponse) => {
  const [
    deleteMusicModalOpened,
    { open: openDeleteMusicModal, close: closeDeleteMusicModal },
  ] = useDisclosure(false);

  return (
    <>
      <DeleteMusicModal
        id={music.id}
        artistId={music.artist_id}
        opened={deleteMusicModalOpened}
        onClose={closeDeleteMusicModal}
      />
      <Group gap={4}>
        <ActionIcon variant="subtle" color="blue" size={"sm"}>
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon variant="subtle" color="red" onClick={openDeleteMusicModal}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </>
  );
};

const columns: DataTableColumn<IMusicResponse>[] = [
  {
    title: "#",
    accessor: "id",
    textAlign: "right",
  },
  {
    title: "Name",
    accessor: "title",
  },
  {
    title: "Genre",
    accessor: "genre",
  },
  {
    title: "Album Name",
    accessor: "album_name",
  },
  {
    title: "Created At",
    accessor: "created_at",
    render: (value) => value.created_at.toLocaleString(),
  },
  {
    title: "Actions",
    accessor: "actions",
    render: MusicTableActions,
  },
];

export const MusicTable = () => {
  const user = useAuth();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const skip = (page - 1) * perPage;

  const getAllArtistMusic = useGetArtistMusic(user!.artist_id!, skip, perPage);

  return (
    getAllArtistMusic.data && (
      <DataTable
        minHeight={400}
        withTableBorder
        fetching={getAllArtistMusic.isFetching}
        columns={columns}
        records={getAllArtistMusic.data.data}
        idAccessor={"id"}
        totalRecords={getAllArtistMusic.data.total}
        page={page}
        onPageChange={setPage}
        recordsPerPage={perPage}
        onRecordsPerPageChange={setPerPage}
        recordsPerPageOptions={[10, 20, 50, 100]}
      />
    )
  );
};
