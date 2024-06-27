import {
  Grid,
  Button,
  Text,
  Card,
  Divider,
  Pagination,
  SegmentedControl,
  Table,
  TextInput,
  Group,
  Modal,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteJobRole,
  fetchJobRoles,
  fetchPermissions,
  setJobRole,
} from '@/redux/slices/employeeSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { hasPrivilege } from '@/helpers/utils/permissionHandler';

interface JobRole {
  _id: string;
  name: string;
  permissions: string[];
}

const JobRoles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const jobRoles = useSelector((state: RootState) => state.employees.jobRoles);
  const status = useSelector((state: RootState) => state.employees.status);
  const [activePage, setPage] = useState(1);
  const [jobRoleToDelete, setJobRoleToDelete] = useState<JobRole | null>(null);
  const [opened, setOpened] = useState(false);

  // due to the permission handler is not works
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];

  const hasPrivilege = (permission: string) => {
    try {
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking privilege:', error);
      return false;
    }
  };

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
  };

  const userDetailsString = localStorage.getItem('user');
  const userDetails = JSON.parse(userDetailsString);
  const role = userDetails.role.name;

  useEffect(() => {
    dispatch(fetchJobRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleCreateJobBtn = () => {
    dispatch(setJobRole(null));
    dispatch(fetchPermissions());
    navigate('/admin/jobRoles/add-edit');
  };

  const handleEditBtn = (element: JobRole) => {
    dispatch(setJobRole(element));
    navigate('/admin/jobRoles/add-edit');
  };

  const handleDeleteBtn = (element: JobRole) => {
    setJobRoleToDelete(element);
    setOpened(true);
  };

  const handleDeleteJobRole = async () => {
    try {
      const id = jobRoleToDelete?._id;
      if (id) {
        await dispatch(deleteJobRole(id)).unwrap();
        dispatch(fetchJobRoles());
        setOpened(false);
        Notifications.show({
          title: 'Successful',
          message: 'Job Role Deleted Successfully',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
      }
    } catch (e: any) {
      setOpened(false);
      Notifications.show({
        title: 'Error',
        message: 'There was an error deleting the job role',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    } finally {
      setJobRoleToDelete(null);
    }
  };

  const [searchSegment, setSearchSegment] = useState('Job Role');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const rolesPerPage = 10;

  const start = (activePage - 1) * rolesPerPage;
  const end = start + rolesPerPage;

  const filteredRoles = jobRoles.filter((role: JobRole) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRoles = filteredRoles.slice(start, end);

  const rows = displayedRoles.map((element: JobRole) => (
    <Table.Tr key={element._id}>
      <Table.Td width="30%">{element.name}</Table.Td>
      <Table.Td width="50%">{element.permissions?.length ?? 0} Permissions</Table.Td>
      <Table.Td width="20%">
        <div>
          {hasPrivilege('EDIT_JOB_ROLES') && (
            <Button
              size="xs"
              color="violet"
              onClick={() => handleEditBtn(element)}
              disabled={role !== 'Super Admin' || element.name === 'Super Admin'}
            >
              Edit
            </Button>
          )}
          {hasPrivilege('DELETE_JOB_ROLES') && (
            <Button
              ml={10}
              size="xs"
              color="red"
              disabled={role !== 'Super Admin' || element.name === 'Super Admin'}
              onClick={() => handleDeleteBtn(element)}
            >
              Delete
            </Button>
          )}
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Job Role</Table.Th>
      <Table.Th>Permissions</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Job Roles</Text>
            </div>
            {hasPrivilege('ADD_JOB_ROLES') && (
              <Button size="sm" onClick={handleCreateJobBtn}>
                Create Job Roles
              </Button>
            )}
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Job Role']}
                defaultValue="Job Role"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredRoles.length / rolesPerPage)}
              value={activePage}
              onChange={handlePageChange}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the Job Role {jobRoleToDelete?.name}?</Text>
        <Group position="right" mt="md" align="end">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteJobRole}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default JobRoles;
