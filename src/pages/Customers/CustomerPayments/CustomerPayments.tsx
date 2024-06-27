import {
  Grid,
  Card,
  Table,
  Pagination,
  Text,
  Menu,
  Badge,
  TextInput,
  SegmentedControl,
  Divider,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchCustomerPayments,
  setCustomerPayment,
  setUpdateCustomerPayment,
} from '@/redux/slices/customerSlice';
import { RootState } from '@/redux/store';
import { hasAnyPrivilege } from '@/helpers/utils/permissionHandler';

function CustomerPayments() {
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.customers.status);
  const error = useSelector((state: RootState) => state.customers.error);
  const customerPayments = useSelector((state: RootState) => state.customers.customerPayments);

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

  useEffect(() => {
    dispatch(fetchCustomerPayments());
  }, [dispatch]);

  const paymentsPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };
  const startMain = (activePage - 1) * paymentsPerPage;
  const endMain = startMain + paymentsPerPage;

  // for search
  const [searchSegment, setSearchSegment] = useState('Customer');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering orders based on search
  const filteredPayments = customerPayments.filter((request: any) => {
    const value =
      searchSegment === 'Customer'
        ? request.customerOrder?.customerOrderRequest?.customer?.fullName || ''
        : request.customerOrder?.orderId;
    return value?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  const displayedPayments = filteredPayments.slice(startMain, endMain);

  const handleViewPayment = (element: any) => {
    dispatch(setCustomerPayment(element));
    navigate('/admin/customers/view-payments');
  };

  const handleNewPayment = (element: any) => {
    dispatch(setCustomerPayment(element));
    dispatch(setUpdateCustomerPayment(null));
    navigate('/admin/customers/add-payments');
  };

  const rows = displayedPayments.map((element, index) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td>{element?.customerOrder?.orderId}</Table.Td>
        <Table.Td>{element?.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{element?.customerOrder?.customerOrderRequest?.customer?.fullName}</Table.Td>
        <Table.Td>{element?.totalPayable?.toFixed(2)}</Table.Td>
        <Table.Td>
          {element?.paymentDetails
            .reduce((sum: any, item: any) => (item.method === 'Cash' ? sum + item.amount : sum), 0)
            .toFixed(2)}
        </Table.Td>
        <Table.Td>
          {element?.paymentDetails
            .reduce(
              (sum: any, item: any) => (item.method === 'Cheque' ? sum + item.amount : sum),
              0
            )
            .toFixed(2)}
        </Table.Td>
        <Table.Td>{element?.outstanding?.toFixed(2)}</Table.Td>
        <Table.Td>
          <Badge color={element.status === 'PAID' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            {hasAnyPrivilege(['VIEW_CUSTOMER_PAYMENTS', 'EDIT_CUSTOMER_PAYMENTS']) && (
              <Menu.Dropdown>
                {element.status === 'PAID' ? (
                  <Menu.Item onClick={() => handleViewPayment(element)}>View Payment</Menu.Item>
                ) : (
                  <Menu.Item onClick={() => handleNewPayment(element)}>Make Payment</Menu.Item>
                )}
              </Menu.Dropdown>
            )}
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
      <Table.Th>Amount</Table.Th>
      <Table.Th>Cash</Table.Th>
      <Table.Th>Cheque</Table.Th>
      <Table.Th>Outstanding</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Customer Payments </Text>
            </div>
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
              total={Math.ceil(filteredPayments.length / paymentsPerPage)}
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

export default CustomerPayments;
