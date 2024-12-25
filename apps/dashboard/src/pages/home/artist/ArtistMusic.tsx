import { IMusicResponse } from "@ams/core";
import { Title } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetArtistMusic } from "../../../hooks/api/music/useGetArtistMusic";

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
];

export const ArtistMusic = () => {
  const { id: artistId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const skip = (page - 1) * perPage;
  const artistMusic = useGetArtistMusic(
    parseInt(artistId ?? "0"),
    skip,
    perPage,
  );

  useEffect(() => {
    if (!artistId) navigate("/artists");
    if (artistId) {
      const id = parseInt(artistId);
      if (isNaN(id)) navigate("/artists");
    }
  }, [artistId, navigate]);

  return (
    <>
      <Title order={3} style={{ marginBottom: 20 }}>
        Artist Music
      </Title>

      {artistMusic.data && (
        <DataTable
          title="Artist Music"
          minHeight={400}
          withTableBorder
          fetching={artistMusic.isLoading}
          columns={columns}
          records={artistMusic.data.data}
          idAccessor={"id"}
          totalRecords={artistMusic.data.total}
          page={page}
          onPageChange={setPage}
          recordsPerPage={perPage}
          onRecordsPerPageChange={setPerPage}
          recordsPerPageOptions={[10, 20, 50, 100]}
        />
      )}
    </>
  );
};
