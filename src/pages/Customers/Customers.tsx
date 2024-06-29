import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Menu,
  Modal,
  Pagination,
  SegmentedControl,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteCustomer,
  fetchCustomerOrderRequests,
  fetchCustomerOrders,
  fetchCustomerPayments,
  fetchCustomers,
  setCustomer,
} from '@/redux/slices/customerSlice';
import { AppDispatch, RootState } from '@/redux/store';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function Customers() {
  const [opened, setOpened] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.customers);
  const status = useSelector((state: RootState) => state.customers.status);

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

  // for pagination
  const [activePage, setPage] = useState(1);
  const customerPerPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Email');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCustomerOrderRequests());
    dispatch(fetchCustomerOrders());
    dispatch(fetchCustomerPayments());
  }, [dispatch]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * customerPerPage;
  const end = start + customerPerPage;

  // filtering customers based on search
  const filteredCustomers = customers.filter((customer: any) => {
    const value =
      searchSegment === 'Name'
        ? customer.fullName
        : searchSegment === 'Phone'
          ? customer.phone
          : customer.email;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedCustomers = filteredCustomers.slice(start, end);

  const handleViewEdit = (customer: any, action: any) => {
    if (action === 'delete') {
      setCustomerToDelete(customer);
      setOpened(true);
    } else {
      dispatch(setCustomer(customer));
      if (action === 'view') {
        navigate('/admin/customers/view');
      } else if (action === 'edit') {
        navigate('/admin/customers/add-edit');
      }
    }
  };

  const handleAddCustomer = () => {
    dispatch(setCustomer(null));
    navigate('/admin/customers/add-edit');
  };

  const handleDeleteCustomer = async () => {
    try {
      await dispatch(deleteCustomer(customerToDelete._id)).unwrap();
      dispatch(fetchCustomers());
      setOpened(false);
      Notifications.show({
        title: 'Successful',
        message: 'Customer Deleted Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
    } catch (e: any) {
      setOpened(false);
      Notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const rows = displayedCustomers.map((element: any, index: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{start + index + 1}</Table.Td> {/* Adjusted row number */}
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>
        <Badge color={element?.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            {hasPrivilege('VIEW_CUSTOMERS') && (
              <Menu.Item onClick={() => handleViewEdit(element, 'view')}>View</Menu.Item>
            )}
            {hasPrivilege('EDIT_CUSTOMERS') && (
              <Menu.Item onClick={() => handleViewEdit(element, 'edit')}>Edit</Menu.Item>
            )}
            {hasPrivilege('DELETE_CUSTOMERS') && (
              <Menu.Item onClick={() => handleViewEdit(element, 'delete')} color="red">
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
      <Table.Th>#</Table.Th>
      <Table.Th>Customer name</Table.Th>
      <Table.Th>Phone</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Address</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Customers</Text>
            </div>
            {hasPrivilege('ADD_CUSTOMERS') && (
              <Button size="sm" onClick={handleAddCustomer}>
                Create Customer
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
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={10}>
                      <Text color="dimmed" align="center">
                        No data found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredCustomers.length / customerPerPage)}
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
        <Text>Are you sure you want to delete the customer {customerToDelete?.fullName}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteCustomer}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Customers;
