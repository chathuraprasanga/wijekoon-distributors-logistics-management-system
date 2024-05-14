import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  SegmentedControl,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Cheques() {
  const data = [
    {
      no: '123456',
      customer: 'Star hardware',
      bank: 'peoples bank',
      branch: '114',
      amount: 'LKR 1200000.00',
      depositDate: '13.04.2024',
      status: 'Depositted',
    },
    {
      no: '234567',
      customer: 'Sunrise Hardware',
      bank: 'Commercial Bank',
      branch: '207',
      amount: 'LKR 800000.00',
      depositDate: '14.04.2024',
      status: 'Depositted',
    },
    {
      no: '345678',
      customer: 'Moonlight Hardware',
      bank: 'Sampath Bank',
      branch: '312',
      amount: 'LKR 1500000.00',
      depositDate: '15.04.2024',
      status: 'Depositted',
    },
    {
      no: '456789',
      customer: 'Golden Hardware',
      bank: 'Hatton National Bank',
      branch: '408',
      amount: 'LKR 500000.00',
      depositDate: '16.04.2024',
      status: 'Depositted',
    },
    {
      no: '567890',
      customer: 'Silver Hardware',
      bank: 'Bank of Ceylon',
      branch: '513',
      amount: 'LKR 1000000.00',
      depositDate: '17.04.2024',
      status: 'Depositted',
    },
  ];

  const tds = data.map((item) => (
    <>
      <Table.Tr>
        <Table.Td>{item.no}</Table.Td>
        <Table.Td>{item.customer}</Table.Td>
        <Table.Td>{item.bank}</Table.Td>
        <Table.Td>{item.branch}</Table.Td>
        <Table.Td>{item.amount}</Table.Td>
        <Table.Td>{item.depositDate}</Table.Td>
        <Table.Td>
          <Badge color="green" radius="sm" size="sm">
            {item.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/cheques/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              {/* <Link to="/admin/cheques/add-edit" style={{ textDecoration: 'none' }}>
                <Menu.Item>Edit</Menu.Item>
              </Link>
              <Menu.Item color="red">Delete</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Cheque Database</Text>
            </div>
            {/* <Button size="sm" onClick={open}>
              Create Trip
            </Button> */}
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Cheque Number', 'Bank', 'Customer']}
                defaultValue="Customer"
              />
              <TextInput size="xs" ml={10} rightSection={<IconSearch />} placeholder="Search" />
            </div>
            <Divider my="md" />
            <Table mt={10} striped highlightOnHover>
              <Table.Tr>
                <Table.Th>Cheque Number</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Bank</Table.Th>
                <Table.Th>Branch</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Deposit Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
              <Table.Tbody>{tds}</Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Cheques;
