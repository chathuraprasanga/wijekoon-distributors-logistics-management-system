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

function Employees() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 'WDE-001',
      name: 'Chathura Prasanga',
      phone: '077 9250108',
      email: 'chathuraprasanga98@gmail.com',
      address: 'godawele watta, kotikapola, mawathagama',
      jobRole: 'Super Admin',
      status: 'ACTIVE',
    },
    {
      id: 'WDE-002',
      name: 'Priayngana Wijekoon',
      phone: '077 4139758',
      email: 'priyanganawijekoon66@gmail.com',
      address: 'godawele watta, kotikapola, mawathagama',
      jobRole: 'Super Admin',
      status: 'ACTIVE',
    },
    {
      id: 'WDE-003',
      name: 'Umega Bentharamudali',
      phone: '077 3023238',
      email: 'umega03@gmail.com',
      address: 'kongoda, barandana',
      jobRole: 'Sales Rep',
      status: 'ACTIVE',
    },
    {
      id: 'WDE-004',
      name: 'indika Kumara',
      phone: '077 1345789',
      email: 'indika09@gmail.com',
      address: 'Kotikapola, Mawathagama',
      jobRole: 'Driver',
      status: 'ACTIVE',
    },
    {
      id: 'WDE-005',
      name: 'indika Kumara',
      phone: '077 1345789',
      email: 'indika09@gmail.com',
      address: 'Kotikapola, Mawathagama',
      jobRole: 'Driver',
      status: 'ACTIVE',
    },
    {
      id: 'WDE-006',
      name: 'Chaminda Kumara',
      phone: '077 3456789',
      email: 'chamindakumara@gmail.com',
      address: 'Kotikapola, Mawathagama',
      jobRole: 'Sales Rep',
      status: 'DEACTIVE',
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
        <Table.Td>{element.jobRole}</Table.Td>
        <Table.Td>
          <Badge color={element.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/employees/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/employees/add-edit" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Employee ID</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Phone</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Address</Table.Th>
      <Table.Th>Job Roles</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Employees</Text>
            </div>
            <Link to="/admin/employees/add-edit">
              <Button size="sm">Create Employees</Button>
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

export default Employees;
