import {
  Table,
  Badge,
  Menu,
  Grid,
  Button,
  Card,
  SegmentedControl,
  TextInput,
  Divider,
  Pagination,
  Text,
  Group,
  Modal,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteEmployee,
  fetchEmployees,
  fetchJobRoles,
  setEmployee,
} from '@/redux/slices/employeeSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function Employees() {
  const [opened, setOpened] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

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

  const employees = useSelector((state: RootState) => state.employees.employees);
  const status = useSelector((state: RootState) => state.employees.status);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchJobRoles());
  }, [dispatch]);

  const handleEditBtn = (element: any, type: string) => {
    dispatch(setEmployee(element));
    if (type === 'view') {
      dispatch(fetchJobRoles);
      navigate('/admin/employees/view');
    }
    if (type === 'edit') {
      dispatch(fetchJobRoles);
      navigate('/admin/employees/add-edit');
    }

    if (type === 'delete') {
      setEmployeeToDelete(element);
      setOpened(true);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      if (employeeToDelete) {
        await dispatch(deleteEmployee(employeeToDelete?._id)).unwrap();
        Notifications.show({
          title: 'Successful',
          message: 'Employee deleted successfully',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
        setOpened(false);
        dispatch(fetchEmployees());
      }
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error deleting the employee',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
      setOpened(false);
      dispatch(fetchEmployees());
    }
  };

  const rows = employees.slice((activePage - 1) * 10, activePage * 10).map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element?.employeeId}</Table.Td>
      <Table.Td>{element?.name}</Table.Td>
      <Table.Td>{element?.phone}</Table.Td>
      <Table.Td>{element?.email}</Table.Td>
      <Table.Td>{element?.address}</Table.Td>
      <Table.Td>{element?.jobRole?.name}</Table.Td>
      <Table.Td>
        <Badge color={element.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            {hasPrivilege('VIEW_EMPLOYEES') && (
              <Menu.Item onClick={() => handleEditBtn(element, 'view')}>View</Menu.Item>
            )}
            {hasPrivilege('EDIT_EMPLOYEES') && (
              <Menu.Item onClick={() => handleEditBtn(element, 'edit')}>Edit</Menu.Item>
            )}
            {hasPrivilege('DELETE_EMPLOYEES') && element.jobRole.name !== 'Super Admin' && (
              <Menu.Item color="red" onClick={() => handleEditBtn(element, 'delete')}>
                Delete
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Employee ID</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Phone</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Address</Table.Th>
      <Table.Th>Job Roles</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const handleCreateBtn = () => {
    dispatch(setEmployee(null));
    navigate('/admin/employees/add-edit');
  };

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Employees</Text>
            </div>
            {hasPrivilege('ADD_EMPLOYEES') && (
              <Button size="sm" onClick={handleCreateBtn}>
                Create Employees
              </Button>
            )}
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Name', 'Phone', 'Email']}
                defaultValue="Email"
              />
              <TextInput size="xs" ml={10} rightSection={<IconSearch />} placeholder="Search" />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(employees.length / 10)}
              value={activePage}
              onChange={setActivePage}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the employee {employeeToDelete?.name}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteEmployee}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Employees;
