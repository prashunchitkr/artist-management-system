import { Role } from "@ams/core";
import { AppShell, Burger, Group, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet } from "react-router-dom";
import { RenderForRole } from "../components/utils/RenderForRole";

export const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding={"md"}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={2}>Artist Management System Dashboard</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <RenderForRole allowedRoles={[Role.SuperAdmin]}>
          <Link to={"/users"}>
            <Text size="lg">Users</Text>
          </Link>
        </RenderForRole>
        <RenderForRole allowedRoles={[Role.SuperAdmin, Role.ArtistManager]}>
          <Link to={"/artists"}>
            <Text size="lg">Artists</Text>
          </Link>
        </RenderForRole>
        <RenderForRole allowedRoles={[Role.SuperAdmin, Role.Artist]}>
          <Link to={"/music"}>
            <Text size="lg">Albums</Text>
          </Link>
        </RenderForRole>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
