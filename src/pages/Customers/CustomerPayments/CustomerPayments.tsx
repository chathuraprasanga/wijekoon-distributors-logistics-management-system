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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerPayments() {
  const [activePage, setPage] = useState(1);

  const elements = [
    {
      orderId: 'WD-101',
      date: '01/04/2024',
      customer: 'Chathura Prasanga',
      amount: '125000.00',
      cash: '25000.00',
      cheque: '50000.00',
      outstanding: '50000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-102',
      date: '02/04/2024',
      customer: 'John Doe',
      amount: '150000.00',
      cash: '75000.00',
      cheque: '0.00',
      outstanding: '75000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-103',
      date: '03/04/2024',
      customer: 'Jane Smith',
      amount: '100000.00',
      cash: '50000.00',
      cheque: '0.00',
      outstanding: '50000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-104',
      date: '04/04/2024',
      customer: 'Michael Johnson',
      amount: '80000.00',
      cash: '0.00',
      cheque: '40000.00',
      outstanding: '40000.00',
      status: 'NOT PAID',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.customer}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>{element.cash}</Table.Td>
        <Table.Td>{element.cheque}</Table.Td>
        <Table.Td>{element.outstanding}</Table.Td>
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
                <Link to="/admin/customers/view-payments" style={{ textDecoration: 'none' }}>
                  <Menu.Item>View Payment</Menu.Item>
                </Link>
              ) : (
                <Link to="/admin/customers/add-payments" style={{ textDecoration: 'none' }}>
                  <Menu.Item>Make Payment</Menu.Item>
                </Link>
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
                data={['Order ID', 'Date', 'Customer']}
                defaultValue="Customer"
              />
              <TextInput size="xs" ml={10} rightSection={<IconSearch />} placeholder="Search" />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={elements.length / 10}
              value={activePage}
              onChange={setPage}
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
