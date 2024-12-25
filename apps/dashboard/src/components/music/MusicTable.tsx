import { IMusicResponse } from "@ams/core";
import { Button, Group } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useGetArtistMusic } from "../../hooks/api/music/useGetArtistMusic";

const musicTableActions = (music: IMusicResponse) => {
  return (
    <Group gap={4}>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Group>
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
    render: musicTableActions,
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
