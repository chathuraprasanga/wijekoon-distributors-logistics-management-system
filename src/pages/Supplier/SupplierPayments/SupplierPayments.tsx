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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupplierPayments() {
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
    {
      orderId: 'WD-105',
      date: '05/04/2024',
      customer: 'Emily Brown',
      amount: '75000.00',
      cash: '75000.00',
      cheque: '0.00',
      outstanding: '0.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-106',
      date: '06/04/2024',
      customer: 'William Wilson',
      amount: '90000.00',
      cash: '45000.00',
      cheque: '0.00',
      outstanding: '45000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-107',
      date: '07/04/2024',
      customer: 'Emma Martinez',
      amount: '110000.00',
      cash: '0.00',
      cheque: '55000.00',
      outstanding: '55000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-108',
      date: '08/04/2024',
      customer: 'Daniel Anderson',
      amount: '60000.00',
      cash: '30000.00',
      cheque: '0.00',
      outstanding: '30000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-109',
      date: '09/04/2024',
      customer: 'Olivia Rodriguez',
      amount: '70000.00',
      cash: '0.00',
      cheque: '35000.00',
      outstanding: '35000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-110',
      date: '10/04/2024',
      customer: 'James Taylor',
      amount: '120000.00',
      cash: '60000.00',
      cheque: '0.00',
      outstanding: '60000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-111',
      date: '11/04/2024',
      customer: 'Sophia Garcia',
      amount: '95000.00',
      cash: '0.00',
      cheque: '47500.00',
      outstanding: '47500.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-112',
      date: '12/04/2024',
      customer: 'Benjamin Martinez',
      amount: '83000.00',
      cash: '41500.00',
      cheque: '0.00',
      outstanding: '41500.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-113',
      date: '13/04/2024',
      customer: 'Isabella Hernandez',
      amount: '72000.00',
      cash: '36000.00',
      cheque: '0.00',
      outstanding: '36000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-114',
      date: '14/04/2024',
      customer: 'Ethan Lopez',
      amount: '88000.00',
      cash: '0.00',
      cheque: '44000.00',
      outstanding: '44000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-115',
      date: '15/04/2024',
      customer: 'Mia Gonzalez',
      amount: '105000.00',
      cash: '52500.00',
      cheque: '0.00',
      outstanding: '52500.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-116',
      date: '16/04/2024',
      customer: 'Alexander Wilson',
      amount: '98000.00',
      cash: '49000.00',
      cheque: '0.00',
      outstanding: '49000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-117',
      date: '17/04/2024',
      customer: 'Charlotte Smith',
      amount: '77000.00',
      cash: '0.00',
      cheque: '38500.00',
      outstanding: '38500.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-118',
      date: '18/04/2024',
      customer: 'Jacob Johnson',
      amount: '82000.00',
      cash: '41000.00',
      cheque: '0.00',
      outstanding: '41000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-119',
      date: '19/04/2024',
      customer: 'Amelia Brown',
      amount: '93000.00',
      cash: '46500.00',
      cheque: '0.00',
      outstanding: '46500.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-120',
      date: '20/04/2024',
      customer: 'Daniel Jones',
      amount: '86000.00',
      cash: '43000.00',
      cheque: '0.00',
      outstanding: '43000.00',
      status: 'PAID',
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
                <Link to="/admin/suppliers/view-payments" style={{ textDecoration: 'none' }}>
                  <Menu.Item>View Payment</Menu.Item>
                </Link>
              ) : (
                <Link to="/admin/suppliers/view-payments" style={{ textDecoration: 'none' }}>
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
                data={['Order ID', 'Date', 'Supplier']}
                defaultValue="Supplier"
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

export default SupplierPayments;
