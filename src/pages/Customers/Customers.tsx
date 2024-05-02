import { Badge, Button, Card, Divider, Grid, Menu, Pagination, SegmentedControl, Table, Text, TextInput } from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Customers() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 1,
      name: 'Robert Davis',
      phone: '+1 1234567890',
      email: 'robertdavis@example.com',
      address: '123, lakeside, new york, USA',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Jennifer Smith',
      phone: '+1 2345678901',
      email: 'jennifersmith@example.com',
      address: '456, main street, chicago, USA',
      status: 'ACTIVE',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      phone: '+1 3456789012',
      email: 'michaeljohnson@example.com',
      address: '789, park avenue, los angeles, USA',
      status: 'ACTIVE',
    },
    {
      id: 4,
      name: 'Emily Brown',
      phone: '+1 4567890123',
      email: 'emilybrown@example.com',
      address: '1011, oakwood drive, houston, USA',
      status: 'ACTIVE',
    },
    {
      id: 5,
      name: 'William Wilson',
      phone: '+1 5678901234',
      email: 'williamwilson@example.com',
      address: '1213, maple lane, miami, USA',
      status: 'ACTIVE',
    },
    {
      id: 6,
      name: 'Emma Martinez',
      phone: '+1 6789012345',
      email: 'emmamartinez@example.com',
      address: '1415, pine street, phoenix, USA',
      status: 'ACTIVE',
    },
    {
      id: 7,
      name: 'Daniel Anderson',
      phone: '+1 7890123456',
      email: 'danielanderson@example.com',
      address: '1617, cedar road, san diego, USA',
      status: 'ACTIVE',
    },
    {
      id: 8,
      name: 'Olivia Rodriguez',
      phone: '+1 8901234567',
      email: 'oliviarodriguez@example.com',
      address: '1819, elm avenue, dallas, USA',
      status: 'ACTIVE',
    },
    {
      id: 9,
      name: 'James Taylor',
      phone: '+1 9012345678',
      email: 'jamestaylor@example.com',
      address: '2021, birch lane, seattle, USA',
      status: 'ACTIVE',
    },
    {
      id: 10,
      name: 'Sophia Garcia',
      phone: '+1 0123456789',
      email: 'sophiagarcia@example.com',
      address: '2223, aspen drive, atlanta, USA',
      status: 'ACTIVE',
    },
    {
      id: 11,
      name: 'Benjamin Martinez',
      phone: '+1 1234509876',
      email: 'benjaminmartinez@example.com',
      address: '2425, willow road, denver, USA',
      status: 'ACTIVE',
    },
    {
      id: 12,
      name: 'Isabella Hernandez',
      phone: '+1 2345098765',
      email: 'isabellahernandez@example.com',
      address: '2627, juniper lane, philadelphia, USA',
      status: 'ACTIVE',
    },
    {
      id: 13,
      name: 'Ethan Lopez',
      phone: '+1 3450987654',
      email: 'ethanlopez@example.com',
      address: '2829, cedar avenue, boston, USA',
      status: 'ACTIVE',
    },
    {
      id: 14,
      name: 'Mia Gonzalez',
      phone: '+1 4569876543',
      email: 'miagonzalez@example.com',
      address: '3031, pine drive, las vegas, USA',
      status: 'ACTIVE',
    },
    {
      id: 15,
      name: 'Alexander Wilson',
      phone: '+1 5698765432',
      email: 'alexanderwilson@example.com',
      address: '3233, oak road, san francisco, USA',
      status: 'ACTIVE',
    },
    {
      id: 16,
      name: 'Charlotte Smith',
      phone: '+1 6987654321',
      email: 'charlottesmith@example.com',
      address: '3435, maple lane, portland, USA',
      status: 'ACTIVE',
    },
    {
      id: 17,
      name: 'Jacob Johnson',
      phone: '+1 9876543210',
      email: 'jacobjohnson@example.com',
      address: '3637, elm street, washington, USA',
      status: 'ACTIVE',
    },
    {
      id: 18,
      name: 'Amelia Brown',
      phone: '+1 8765432109',
      email: 'ameliabrown@example.com',
      address: '3839, oakwood drive, new orleans, USA',
      status: 'ACTIVE',
    },
    {
      id: 19,
      name: 'Daniel Jones',
      phone: '+1 7654321098',
      email: 'danieljones@example.com',
      address: '4041, pine avenue, orlando, USA',
      status: 'ACTIVE',
    },
    {
      id: 20,
      name: 'Ava Davis',
      phone: '+1 6543210987',
      email: 'avadavis@example.com',
      address: '4243, juniper lane, miami, USA',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.phone}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.address}</Table.Td>
        <Table.Td>
          <Badge color="green" radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/customers/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/customers/add-edit" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Customer name</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Customers</Text>
            </div>
            <Link to="/admin/customers/add-edit">
              <Button size="sm">Create Customer</Button>
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

export default Customers;
