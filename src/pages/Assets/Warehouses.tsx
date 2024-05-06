import {
  Grid,
  Button,
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

function Warehouses() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      id: 'WDW-01',
      city: 'Mawathagama',
      address: 'BOI Junction, Kandy rd, Mawathagama',
      products: '04',
      quantity: '1000',
      status: 'ACTIVE',
    },
    {
      id: 'WDW-01',
      city: 'Mawathagama',
      address: 'BOI Junction, Kandy rd, Mawathagama',
      products: '04',
      quantity: '1000',
      status: 'ACTIVE',
    },
    {
      id: 'WDW-01',
      city: 'Mawathagama',
      address: 'BOI Junction, Kandy rd, Mawathagama',
      products: '04',
      quantity: '1000',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="10%">{element.id}</Table.Td>
        <Table.Td width="20%">{element.city}</Table.Td>
        <Table.Td width="35%">{element.address}</Table.Td>
        <Table.Td width="10%">{element.products}</Table.Td>
        <Table.Td width="10%">{element.quantity}</Table.Td>
        <Table.Td width="10%">
          <Badge color={element.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td width="5%">
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/assets/view-warehouses" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Warehouse ID</Table.Th>
      <Table.Th>City</Table.Th>
      <Table.Th>Address</Table.Th>
      <Table.Th>Prodcuts</Table.Th>
      <Table.Th>Quantity</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Warehouse</Text>
            </div>
            <Link to="/admin/suppliers/add-edit">
              <Button size="sm">Add Warehouse</Button>
            </Link>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['City']}
                defaultValue="City"
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

export default Warehouses;
