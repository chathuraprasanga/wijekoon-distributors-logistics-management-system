import {
  Grid,
  Card,
  SegmentedControl,
  TextInput,
  Divider,
  Table,
  Pagination,
  Text,
  Badge,
  Menu,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSupplierPayments, setSupplierPayment } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';

function SupplierPayments() {
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.customers.status);
  const error = useSelector((state: RootState) => state.customers.error);
  const payments = useSelector((state: RootState) => state.suppliers.supplierPayments);

  useEffect(() => {
    dispatch(fetchSupplierPayments());
  }, [dispatch]);

  const paymentsPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };
  const startMain = (activePage - 1) * paymentsPerPage;
  const endMain = startMain + paymentsPerPage;

  const [searchSegment, setSearchSegment] = useState('Supplier');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering orders based on search
  const filteredPayments = payments.filter((request: any) => {
    const value =
      searchSegment === 'Customer'
        ? request.supplierOrder?.supplierOrderRequest?.supplier?.name || ''
        : request.supplierOrder?.supplierOrderRequest?.orderId;
    return value?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  const displayedPayments = filteredPayments.slice(startMain, endMain);

  const handleView = (data: any) => {
    dispatch(setSupplierPayment(data));

    navigate('/admin/suppliers/view-payments');
  };

  const handlePayment = (data:any) => {
    dispatch(setSupplierPayment(data));
    navigate('/admin/suppliers/view-payments');
  };

  const rows = displayedPayments.map((element, index) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td>{element?.supplierOrder?.supplierOrderRequest?.orderId}</Table.Td>
        <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{element?.supplierOrder?.supplierOrderRequest?.supplier?.name}</Table.Td>
        <Table.Td>{element?.totalPayable?.toFixed(2)}</Table.Td>
        <Table.Td>
          {element?.supplierOrder?.paymentDetails.payments
            .reduce((sum: any, item: any) => (item.method === 'Cash' ? sum + item.amount : sum), 0)
            .toFixed(2)}
        </Table.Td>
        <Table.Td>
          {element?.supplierOrder?.paymentDetails.payments
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

            <Menu.Dropdown>
              {element.status === 'PAID' ? (
                // <Link to="/admin/suppliers/view-payments" style={{ textDecoration: 'none' }}>
                <Menu.Item onClick={() => handleView(element)}>View Payment</Menu.Item>
              ) : (
                // </Link>
                // <Link to="/admin/suppliers/view-payments" style={{ textDecoration: 'none' }}>
                <Menu.Item onClick={() => handlePayment(element)}>Make Payment</Menu.Item>
                // </Link>
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
      <Table.Th>Supplier</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Supplier Payments </Text>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Order ID', 'Supplier']}
                defaultValue="Supplier"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                onChange={(event) => setSearchTerm(event.currentTarget.value.trim())}
                rightSection={<IconSearch />}
                placeholder="Search"
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

export default SupplierPayments;
