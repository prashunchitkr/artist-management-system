import { Button, Stack } from "@mantine/core";
import { MusicTable } from "../../components/music/MusicTable";

export const Music = () => {
  return (
    <Stack>
      <Button>Create Music</Button>
      <MusicTable />
    </Stack>
  );
};
