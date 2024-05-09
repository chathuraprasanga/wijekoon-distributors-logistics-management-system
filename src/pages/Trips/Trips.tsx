import {
  Grid,
  Button,
  Text,
  Card,
  Divider,
  Pagination,
  SegmentedControl,
  Table,
  TextInput,
  Badge,
  Menu,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Trips() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 'WDT-001',
      date: '10.04.2024',
      vehicleId: 'NW LC 3801',
      driver: 'Indika Kumara',
      products: '04',
      quantity: '350',
      purpose: 'For Delivery',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.vehicleId}</Table.Td>
        <Table.Td>{element.driver}</Table.Td>
        <Table.Td>{element.products}</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
        <Table.Td>{element.purpose}</Table.Td>
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
              <Link to="/admin/trips/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/trips/add-edit" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Trip ID</Table.Th>
      <Table.Th>Date</Table.Th>
      <Table.Th>Vehicle Number</Table.Th>
      <Table.Th>Driver</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Quantities</Table.Th>
      <Table.Th>Purpose</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Trips</Text>
            </div>
            <Link to="/admin/trips/add-edit">
              <Button size="sm">Create Trip</Button>
            </Link>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
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

export default Trips;
