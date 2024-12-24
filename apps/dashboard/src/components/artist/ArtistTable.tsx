import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useState } from "react";

import { IArtistResponse } from "@ams/core";
import { useGetAllArtists } from "../../hooks/api/artists/useGetAllArtists";
import { ArtistDetailModal } from "./ArtistDetailModal";
import { EditArtistModal } from "./EditArtistModal";
import { DeleteArtistModal } from "./DeleteArtistModal";

interface IRowActionsProps {
  artist: IArtistResponse;
}

const RowActions = (props: IRowActionsProps) => {
  const [
    artistDetailModalOpened,
    { open: openArtistDetailModal, close: closeArtistDetailModal },
  ] = useDisclosure(false);

  const [
    editArtistModalOpened,
    { open: openEditArtistModal, close: closeEditArtistModal },
  ] = useDisclosure(false);

  const [
    deleteArtistModalOpened,
    { open: openDeleteArtistModal, close: closeDeleteArtistModal },
  ] = useDisclosure(false);

  return (
    <>
      <ArtistDetailModal
        artist={props.artist}
        opened={artistDetailModalOpened}
        onClose={closeArtistDetailModal}
      />
      <EditArtistModal
        artist={props.artist}
        opened={editArtistModalOpened}
        onClose={closeEditArtistModal}
      />
      <DeleteArtistModal
        id={props.artist.id}
        opened={deleteArtistModalOpened}
        onClose={closeDeleteArtistModal}
      />
      <Group gap={4} wrap="nowrap">
        <ActionIcon
          size="sm"
          variant="subtle"
          color="green"
          onClick={openArtistDetailModal}
        >
          <IconEye size={16} />
        </ActionIcon>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="blue"
          onClick={openEditArtistModal}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="red"
          onClick={openDeleteArtistModal}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </>
  );
};

const columns: DataTableColumn<IArtistResponse>[] = [
  {
    title: "#",
    accessor: "id",
    textAlign: "right",
  },
  {
    title: "Name",
    accessor: "name",
  },
  {
    title: "Gender",
    accessor: "gender",
  },
  {
    title: "Created At",
    accessor: "created_at",
    render: (value) => value.created_at.toLocaleString(),
  },
  {
    title: "Actions",
    accessor: "actions",
    render: (value) => <RowActions artist={value} />,
  },
];

export const ArtistTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const skip = (page - 1) * perPage;

  const artists = useGetAllArtists(skip, perPage);

  if (artists.isError) {
    return <div>Error occurred</div>;
  }

  return (
    artists.data && (
      <DataTable
        minHeight={400}
        withTableBorder
        fetching={artists.isLoading}
        records={artists.data.data}
        columns={columns}
        idAccessor={"id"}
        totalRecords={artists.data.total}
        recordsPerPage={perPage}
        page={page}
        onPageChange={setPage}
        recordsPerPageOptions={[10, 20, 50, 100]}
        onRecordsPerPageChange={setPerPage}
      />
    )
  );
};
