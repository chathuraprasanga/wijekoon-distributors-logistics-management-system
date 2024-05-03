import {
  Table,
  Badge,
  Menu,
  Grid,
  Button,
  Card,
  SegmentedControl,
  TextInput,
  Divider,
  Pagination,
  Text,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Suppliers() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 1,
      name: 'Keshara Minerals & Chemicals ',
      phone: '+1 1234567890',
      email: 'kesharaminerals@gmail.com',
      address: 'Pallekale, Digana, Kandy',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Tokyo Cement',
      phone: '+1 2345678901',
      email: 'tokyoc@gmail.com',
      address: '4-B, Puttalama',
      status: 'DEACTIVE',
    },
    {
      id: 3,
      name: 'Swisstex PVT LTD',
      phone: '+1 3456789012',
      email: 'swisstex@sw.io',
      address: '3-B, Colombo',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="5%">{element.id}</Table.Td>
        <Table.Td width="25%">{element.name}</Table.Td>
        <Table.Td width="15%">{element.phone}</Table.Td>
        <Table.Td width="20%">{element.email}</Table.Td>
        <Table.Td width="20%">{element.address}</Table.Td>
        <Table.Td width="10%">
          <Badge color={(element.status === 'ACTIVE' ? 'green' : 'red')} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td width="5%">
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/suppliers/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/suppliers/add-edit" style={{ textDecoration: 'none' }}>
                <Menu.Item>Edit</Menu.Item>
              </Link>
              <Menu.Item color="red">Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>#</Table.Th>
      <Table.Th>Supplier name</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Suppliers</Text>
            </div>
            <Link to="/admin/suppliers/add-edit">
              <Button size="sm">Create Supplier</Button>
            </Link>
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

export default Suppliers;
