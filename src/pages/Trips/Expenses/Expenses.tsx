import {
  Grid,
  Button,
  Text,
  Card,
  Divider,
  SegmentedControl,
  TextInput,
  Table,
  Menu,
} from '@mantine/core';
import { IconDots, IconDotsVertical, IconSearch } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function Expenses() {
  const expensesData = [
    {
      id: 'WDT-002',
      date: '01.04.2024',
      vehicleNumber: 'NW LC 3801',
      driver: 'Indika Kumara',
      purpose: 'For Delivery',
      totalAmount: '6000.00',
    },
  ];

  const tds = expensesData.map((data) => (
    <>
      <Table.Td>{data.id}</Table.Td>
      <Table.Td>{data.date}</Table.Td>
      <Table.Td>{data.vehicleNumber}</Table.Td>
      <Table.Td>{data.driver}</Table.Td>
      <Table.Td>{data.purpose}</Table.Td>
      <Table.Td>LKR {data.totalAmount}</Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            <Link to="/admin/expenses/view" style={{ textDecoration: 'none' }}>
              <Menu.Item>View</Menu.Item>
            </Link>
            <Link to="/admin/expenses/add-edit" style={{ textDecoration: 'none' }}>
              <Menu.Item>Edit</Menu.Item>
            </Link>
            <Menu.Item color="red">Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </>
  ));

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Expenses</Text>
            </div>
            <Link to="/admin/expenses/add-edit"><Button size="sm">Add Expenses</Button></Link>
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
                data={['Trip ID']}
                defaultValue="Trip ID"
              />
              <TextInput size="xs" ml={10} rightSection={<IconSearch />} placeholder="Search" />
            </div>
            <Divider my="md" />
            <Table>
              <Table.Tr>
                <Table.Th>Trip ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Vehicle Number</Table.Th>
                <Table.Th>Driver</Table.Th>
                <Table.Th>Purpose</Table.Th>
                <Table.Th>Total Amount</Table.Th>
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

export default Expenses;
