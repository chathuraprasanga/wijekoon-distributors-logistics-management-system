import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  Modal,
  Pagination,
  SegmentedControl,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import {
  fetchCustomerOrderRequests,
  fetchCustomers,
  setCustomer,
  setCustomerOrderRequest,
} from '@/redux/slices/customerSlice';
import { fetchProducts } from '@/redux/slices/supplierSlice';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function CustomerOrderRequests() {
  const [activePage, setPage] = useState(1);
  const [activeModalPage, setModalPage] = useState(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.customers.status);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const customerOrderRequests = useSelector(
    (state: RootState) => state.customers.customerOrderRequests
  );
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

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

  // pagination for main
  const requestsPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };
  const startMain = (activePage - 1) * requestsPerPage;
  const endMain = startMain + requestsPerPage;

  // pagination for modal
  const customersPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * customersPerPage;
  const endModal = startModal + customersPerPage;

  // for search
  const [searchSegment, setSearchSegment] = useState('Email');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering customers based on search
  const filteredRequests = customerOrderRequests.filter((request: any) => {
    const value = searchSegment === 'Customer' ? request.customer?.fullName || '' : request.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedRequests = filteredRequests.slice(startMain, endMain);

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Email');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredCustomers = customers.filter((customer: any) => {
    const value =
      modalSearchSegment === 'Name'
        ? customer.fullName
        : modalSearchSegment === 'Phone'
          ? customer.phone
          : customer.email;
    return value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displayedCustomers = filteredCustomers.slice(startModal, endModal);

  useEffect(() => {
    dispatch(fetchCustomerOrderRequests());
    dispatch(fetchCustomers());
    dispatch(setCustomerOrderRequest(null));
  }, [dispatch]);

  const handleSelect = (customer) => {
    dispatch(setCustomer(customer));
    navigate('/admin/customers/add-order-requests');
    dispatch(setCustomerOrderRequest(null));
  };

  const handleEdit = (orderRequest) => {
    dispatch(setCustomerOrderRequest(orderRequest));
    dispatch(setCustomer(orderRequest.customer));
    dispatch(fetchProducts());
    navigate('/admin/customers/add-order-requests');
  };

  const handleView = (orderRequest) => {
    dispatch(setCustomerOrderRequest(orderRequest));
    navigate('/admin/customers/view-order-requests');
    // Implement your view functionality here
  };

  const rows = displayedRequests.map((element: any, index: any) => (
    <Table.Tr key={element.orderId}>
      <Table.Td>{element.orderId}</Table.Td>
      <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
      <Table.Td>{element.customer?.fullName || 'N/A'}</Table.Td>
      <Table.Td>{element.order.length}</Table.Td>
      <Table.Td>
        {element.order.reduce((acc: any, item: any) => acc + parseInt(item.quantity), 0)}
      </Table.Td>
      <Table.Td>{element?.expectedDate?.split('T')[0] || 'N/A'}</Table.Td>
      <Table.Td>
        <Badge
          color={(() => {
            switch (element.status) {
              case 'PENDING':
                return 'yellow';
              case 'CONFIRMED':
                return 'green';
              case 'CANCELLED':
                return 'red';
              case 'COMPLETED':
                return 'blue';
              case 'NOT COMPLETED':
                return 'purple';
              default:
                return 'gray';
            }
          })()}
          radius="xs"
          size="xs"
        >
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            {hasPrivilege('VIEW_CUSTOMER_ORDER_REQUESTS') && (
              <Menu.Item onClick={() => handleView(element)}>View</Menu.Item>
            )}
            {hasPrivilege('EDIT_CUSTOMER_ORDER_REQUESTS') && (
              <Menu.Item onClick={() => handleEdit(element)}>Edit</Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Order ID</Table.Th>
      <Table.Th>Date</Table.Th>
      <Table.Th>Customer</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Quantity</Table.Th>
      <Table.Th>Expected Date</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const modalData = displayedCustomers.map((element, index) => (
    <Table.Tr key={element._id}>
      <Table.Td>{startModal + index + 1}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>
        <Button size="xs" onClick={() => handleSelect(element)}>
          Select
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Customer to Create Customer Order Request
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Name', 'Phone', 'Email']}
            defaultValue="Email"
            onChange={setModalSearchSegment}
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Search"
            onChange={(event) => setModalSearchTerm(event.currentTarget.value)}
            rightSection={<IconSearch size="20" color="gray" />}
          />
        </div>
        <div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {modalData.length > 0 ? (
                modalData
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
            total={Math.ceil(filteredCustomers.length / customersPerPage)}
            value={activeModalPage}
            onChange={handleModalPageChange}
            mt={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            size="xs"
          />
        </div>
      </Modal>

      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Customer Order Requests</Text>
            </div>
            {hasPrivilege('ADD_CUSTOMER_ORDER_REQUESTS') && (
              <Button size="sm" onClick={open}>
                Create Customer Order Requests
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
                data={['Customer', 'Order ID']}
                defaultValue="Order ID"
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
              total={Math.ceil(filteredRequests.length / requestsPerPage)}
              value={activePage}
              onChange={handlePageChange}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default CustomerOrderRequests;
