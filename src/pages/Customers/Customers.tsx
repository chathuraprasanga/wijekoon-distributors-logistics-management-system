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

function Customers() {
  const [opened, setOpened] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customers.customers);
  const status = useSelector((state: RootState) => state.customers.status);

  // for pagination
  const [activePage, setPage] = useState(1);
  const customerPerPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Email');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomers());
      dispatch(fetchCustomerOrderRequests());
      dispatch(fetchCustomerOrders());
      dispatch(fetchCustomerPayments());
    }
  }, [status, dispatch]);

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
        message: 'There was an error deleting the customer',
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
            <Menu.Item onClick={() => handleViewEdit(element, 'view')}>View</Menu.Item>
            <Menu.Item onClick={() => handleViewEdit(element, 'edit')}>Edit</Menu.Item>
            <Menu.Item onClick={() => handleViewEdit(element, 'delete')} color="red">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <tr>
      <th>#</th>
      <th>Customer name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Address</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Customers</Text>
            </div>
            <Button size="sm" onClick={handleAddCustomer}>
              Create Customer
            </Button>
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
              <thead>{ths}</thead>
              <tbody>{rows}</tbody>
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
