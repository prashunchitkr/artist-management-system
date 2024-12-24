import { IArtistResponse } from "@ams/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useState } from "react";
import { useGetAllArtists } from "../../hooks/api/artists/useGetAllArtists";

interface IRowActionsProps {
  artist: IArtistResponse;
}

const RowActions = (props: IRowActionsProps) => {
  return <div>RowActions</div>;
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
