import { Group, Modal, Stack, Text } from "@mantine/core";

import { IUserResponse } from "@ams/core";

interface IUserDetailModalProps {
  opened: boolean;
  onClose: () => void;
  user: IUserResponse;
}

interface IUserDetailField {
  label: string;
  value: string | null;
}

const UserDetailField = ({ label, value }: IUserDetailField) => {
  return (
    <Group>
      <Text fw={"bold"}>{label}:</Text>
      <Text>{value ?? "N/A"}</Text>
    </Group>
  );
};

export const UserDetailModal = ({
  opened,
  onClose,
  user,
}: IUserDetailModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="User Detail">
      <Stack gap={"md"}>
        <UserDetailField label="First Name" value={user.first_name} />
        <UserDetailField label="Last Name" value={user.last_name} />
        <UserDetailField label="Email" value={user.email} />
        <UserDetailField label="Role" value={user.role} />
        <UserDetailField label="Gender" value={user.gender} />
        <UserDetailField label="Phone" value={user.phone} />
        <UserDetailField label="Address" value={user.address} />
        <UserDetailField
          label="Date of Birth"
          value={user.dob ? user.dob.toLocaleString() : null}
        />
        <UserDetailField
          label="Created At"
          value={user.created_at.toLocaleString()}
        />
      </Stack>
    </Modal>
  );
};
