import { IArtistResponse } from "@ams/core";
import { Group, Modal, Stack, Text } from "@mantine/core";

interface IArtistDetailModalProps {
  opened: boolean;
  onClose: () => void;
  artist: IArtistResponse;
}

interface IArtistDetailFieldProps {
  label: string;
  value?: string | null;
}

const ArtistDetailField = ({ label, value }: IArtistDetailFieldProps) => {
  return (
    <Group>
      <Text fw={"bold"}>{label}:</Text>
      <Text>{value ?? "N/A"}</Text>
    </Group>
  );
};

export const ArtistDetailModal = ({
  opened,
  onClose,
  artist,
}: IArtistDetailModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Artist Detail">
      <Stack gap={"md"}>
        <ArtistDetailField label="Name" value={artist.name} />
        <ArtistDetailField label="Gender" value={artist.gender} />
        <ArtistDetailField
          label="Date of Birth"
          value={artist.dob?.toLocaleString()}
        />
        <ArtistDetailField label="Address" value={artist.address} />
        <ArtistDetailField
          label="First Release Year"
          value={artist.first_release_year?.toString()}
        />
        <ArtistDetailField
          label="No. of Albums Released"
          value={artist.no_of_albums_released?.toString()}
        />
      </Stack>
    </Modal>
  );
};
