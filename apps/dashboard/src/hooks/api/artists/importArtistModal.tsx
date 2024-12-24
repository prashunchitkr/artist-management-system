import { Button, FileInput, Modal, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useImportArtists } from "./useImportArtists";

type ImportArtistsForm = {
  file: File;
};

interface IImportArtistModalProps {
  opened: boolean;
  onClose: () => void;
}

export const ImportArtistModal = (props: IImportArtistModalProps) => {
  const importArtists = useImportArtists();
  const importArtistsForm = useForm<ImportArtistsForm>();

  const onSubmit = (data: ImportArtistsForm) => {
    importArtists.mutate(data.file);
  };

  return (
    <Modal opened={props.opened} onClose={props.onClose} title="Import Artist">
      <form onSubmit={importArtistsForm.handleSubmit(onSubmit)}>
        <FileInput
          label="Select file"
          required
          accept="text/csv"
          {...importArtistsForm.register("file")}
          onChange={(payload) => {
            if (payload) importArtistsForm.setValue("file", payload);
          }}
        />

        <Button type="submit" loading={importArtists.isPending}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};
