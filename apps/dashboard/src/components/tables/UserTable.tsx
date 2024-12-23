import { IUserResponse } from "@ams/core";
import { useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useGetAllUsers } from "../../hooks/api/users/useGetAllUsers";
import { Button } from "../ui/Button";

interface IRowActionsProps {
  id: number;
}

const RowActions = ({ id }: IRowActionsProps) => {
  return (
    <div>
      <Button variant="primary">Edit</Button>
      <Button variant="secondary">Delete</Button>
    </div>
  );
};

const columns: TableColumn<IUserResponse>[] = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "First Name",
    selector: (row) => row.first_name,
  },
  {
    name: "Last Name",
    selector: (row) => row.last_name,
  },
  {
    name: "Email",
    wrap: true,
    selector: (row) => row.email,
  },
  {
    name: "Gender",
    width: "6%",
    selector: (row) => row.gender,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
  {
    name: "DOB",
    wrap: true,
    selector: (row) => row.dob?.toISOString() ?? "N/A",
  },
  {
    name: "Phone",
    selector: (row) => row.phone ?? "N/A",
  },
  {
    name: "Address",
    wrap: true,
    selector: (row) => row.address ?? "N/A",
  },
  {
    name: "Actions",
    cell: (row) => <RowActions id={row.id} />,
  },
];

export const UserTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);

  const skip = useMemo(() => (page - 1) * perPage, [page, perPage]);

  const users = useGetAllUsers(skip, perPage);

  const handlePageChange = (page: number) => {
    setPage(() => page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    console.debug("Changing per page to", newPerPage);
    setPerPage(() => newPerPage);
  };

  if (users.isError) {
    return <div>Error occurred</div>;
  }

  return (
    users.data && (
      <DataTable
        title="Users"
        data={users.data.data}
        columns={columns}
        progressPending={users.isLoading}
        pagination
        paginationServer
        paginationRowsPerPageOptions={[10]}
        paginationTotalRows={users.data.total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerPageChange}
      />
    )
  );
};
