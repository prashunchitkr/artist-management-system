import { IUserResponse } from "@ams/core";
import { ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useMemo, useState } from "react";
import { useGetAllUsers } from "../../hooks/api/users/useGetAllUsers";
import { EditUserModal } from "../ui/user/EditUserModal";
import { UserDetailModal } from "../ui/user/UserDetailModal";

interface IRowActionsProps {
  user: IUserResponse;
}

const RowActions = (props: IRowActionsProps) => {
  const [
    userDetailModalOpened,
    { open: openUserDetailModal, close: closeUserDetailMOdal },
  ] = useDisclosure(false);

  const [
    editUserModalOpened,
    { open: openEditUserModal, close: closeEditUserModal },
  ] = useDisclosure(false);

  return (
    <>
      <UserDetailModal
        user={props.user}
        opened={userDetailModalOpened}
        onClose={closeUserDetailMOdal}
      />
      <EditUserModal
        user={props.user}
        opened={editUserModalOpened}
        onClose={closeEditUserModal}
      />
      <Group gap={4} wrap="nowrap">
        <ActionIcon
          size={"sm"}
          variant="subtle"
          color="green"
          onClick={openUserDetailModal}
        >
          <IconEye size={16} />
        </ActionIcon>
        <ActionIcon
          size={"sm"}
          variant="subtle"
          color="blue"
          onClick={openEditUserModal}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon size={"sm"} variant="subtle" color="red">
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </>
  );
};

const columns: DataTableColumn<IUserResponse>[] = [
  {
    accessor: "id",
    title: "#",
    textAlign: "right",
  },
  {
    title: "First Name",
    accessor: "first_name",
  },
  {
    title: "Last Name",
    accessor: "last_name",
  },
  {
    title: "Gender",
    accessor: "gender",
  },
  {
    title: "Email",
    accessor: "email",
  },
  {
    title: "Role",
    accessor: "role",
  },
  {
    title: "Created At",
    accessor: "created_at",
    render: (value) => new Date(value.created_at).toLocaleString(),
  },
  {
    title: "Actions",
    accessor: "actions",
    render: (value) => <RowActions user={value} />,
  },
];

export const UserTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const skip = useMemo(() => (page - 1) * perPage, [page, perPage]);

  const users = useGetAllUsers(skip, perPage);

  if (users.isError) {
    return <div>Error occurred</div>;
  }

  return (
    users.data && (
      <DataTable
        withTableBorder
        fetching={users.isLoading}
        records={users.data.data}
        columns={columns}
        idAccessor={"id"}
        totalRecords={users.data.total}
        recordsPerPage={perPage}
        page={page}
        onPageChange={setPage}
        recordsPerPageOptions={[10, 20, 50, 100]}
        onRecordsPerPageChange={setPerPage}
      />
    )
  );
};
