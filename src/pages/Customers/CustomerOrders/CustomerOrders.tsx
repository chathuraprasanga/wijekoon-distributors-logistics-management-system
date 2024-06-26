import {
  Grid,
  Button,
  Card,
  Table,
  Pagination,
  Text,
  Badge,
  Menu,
  Modal,
  TextInput,
  SegmentedControl,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchCustomers,
  fetchCustomerOrderRequests,
  fetchCustomerOrders,
  setCustomerOrderRequest,
  setCustomerPayment,
  fetchConfirmedCustomerOrderRequests,
  setCustomerOrder,
} from '@/redux/slices/customerSlice';
import { RootState } from '@/redux/store';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function CustomerOrders() {
  const [activePage, setPage] = useState(1);
  const [activeModalPage, setModalPage] = useState(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.customers.status);
  const customers = useSelector((state: RootState) => state.customers.customers);
  const customerOrderRequests = useSelector(
    (state: RootState) => state.customers.customerOrderRequests
  );
  const confirmedCustomerOrderRequests = useSelector(
    (state: RootState) => state.customers.confirmedCustomerOredrRequests
  );
  const customerOrders = useSelector((state: RootState) => state.customers.customerOrders);

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

  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCustomerOrderRequests());
    dispatch(fetchConfirmedCustomerOrderRequests());
    dispatch(fetchCustomerOrders());
  }, [dispatch]);

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
  const [searchSegment, setSearchSegment] = useState('Customer');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering orders based on search
  const filteredOrders = customerOrders.filter((request: any) => {
    const value =
      searchSegment === 'Customer'
        ? request.customerOrderRequest?.customer?.fullName || ''
        : request.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedOrders = filteredOrders.slice(startMain, endMain);

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Customer');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredRequests = confirmedCustomerOrderRequests.filter((request: any) => {
    const value =
      modalSearchSegment === 'Customer' && request.customer
        ? request.customer.fullName
        : request.orderId;
    return value && value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displaedRequests = filteredRequests.slice(startModal, endModal);

  const handleSelect = (request: any) => {
    dispatch(setCustomerOrderRequest(request));
    dispatch(setCustomerPayment(null));
    navigate('/admin/customers/add-orders');
  };

  const handleView = (element: any) => {
    dispatch(setCustomerOrder(element));
    navigate('/admin/customers/view-orders');
  };

  const rows = displayedOrders.map((element, index) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.createdAt?.split('T')[0]}</Table.Td>
        <Table.Td>{element?.customerOrderRequest?.customer?.fullName}</Table.Td>
        <Table.Td>{element?.customerOrderRequest?.order?.length}</Table.Td>
        <Table.Td>
          {element?.customerOrderRequest?.order?.reduce(
            (sum: any, item: any) => sum + item.quantity,
            0
          )}
        </Table.Td>{' '}
        <Table.Td>{element.netTotal?.toFixed(2)}</Table.Td>
        <Table.Td>
          <Badge color={element.status === 'PAID' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              {hasPrivilege('VIEW_CUSTOMER_ORDERS') && (
                <Menu.Item onClick={() => handleView(element)}>View</Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Order ID</Table.Th>
      <Table.Th>Date </Table.Th>
      <Table.Th>Customer</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Qty</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const modalData = displaedRequests.map((element, index) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element?.orderId}</Table.Td>
        <Table.Td>{element?.createdAt?.split('T')[0]}</Table.Td>
        <Table.Td>{element?.customer?.fullName}</Table.Td>
        <Table.Td>{element?.order?.length}</Table.Td>
        <Table.Td>{element?.order.map((item: any) => parseInt(item.quantity))}</Table.Td>
        <Table.Td>{element?.netTotal?.toFixed(2)}</Table.Td>
        <Table.Td>
          <Button size="xs" onClick={() => handleSelect(element)}>
            Select
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Customer Order Request to Create Customer Order
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Order ID', 'Customer']}
            defaultValue="Customer"
            onChange={setModalSearchSegment}
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Serach"
            rightSection={<IconSearch size="20" color="gray" />}
            onChange={(event) => setModalSearchTerm(event.currentTarget.value)}
          />
        </div>
        <div>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Products</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Amount</Table.Th>
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
            total={Math.ceil(confirmedCustomerOrderRequests.length / customersPerPage)}
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
              <Text style={{ fontWeight: 'bold' }}>Customer Order </Text>
            </div>
            {hasPrivilege('ADD_CUSTOMER_ORDERS') && (
              <Button size="sm" onClick={open}>
                Create Customer Order
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
                data={['Order ID', 'Customer']}
                defaultValue="Customer"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.currentTarget.value.trim())}
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
              total={Math.ceil(filteredOrders.length / requestsPerPage)}
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

export default CustomerOrders;
