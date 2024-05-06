import { Table, Badge, Menu, Grid, Button, Card, SegmentedControl, TextInput, Divider, Pagination, Text } from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Vehicles() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 'WDV-01',
      number: 'LC-3801',
      brand: 'Mitshubisi',
      type: 'Lorry',
      capacity: '8500KG',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="10%">{element.id}</Table.Td>
        <Table.Td width="10%">{element.number}</Table.Td>
        <Table.Td width="20%">{element.brand}</Table.Td>
        <Table.Td width="20%">{element.type}</Table.Td>
        <Table.Td width="15%">{element.capacity}</Table.Td>
        <Table.Td width="15%">
          <Badge color={element.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td width="10%">
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/vehicles/view" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/vehicles/add-edit" style={{ textDecoration: 'none' }}>
                <Menu.Item>Edit</Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Vehicle ID</Table.Th>
      <Table.Th>Number</Table.Th>
      <Table.Th>Brand</Table.Th>
      <Table.Th>Type</Table.Th>
      <Table.Th>Capacity</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Vehicles</Text>
            </div>
            <Link to="/admin/vehicles/add-edit">
              <Button size="sm">Add Vehicle</Button>
            </Link>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl size="xs" color="violet" data={['Vehicle Number']} defaultValue="Vehicle Number" />
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

export default Vehicles;
