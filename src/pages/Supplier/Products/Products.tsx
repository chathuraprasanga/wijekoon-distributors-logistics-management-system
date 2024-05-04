import {
  Grid,
  Card,
  SegmentedControl,
  TextInput,
  Divider,
  Table,
  Pagination,
  Text,
  Menu,
  Badge,
  Button,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [activePage, setPage] = useState(1);

  const elements = [
    {
      code: 'KSL-15',
      name: 'Keshara Super Lime',
      size: '15KG',
      buyingPrice: '370.00',
      sellingPrice: '450.00',
      supplier: 'Keshara Minerals and Chemicals ',
      status: 'ACTIVE',
    },
    {
      code: 'KSL-20',
      name: 'Keshara Super Lime',
      size: '20KG',
      buyingPrice: '450.00',
      sellingPrice: '550.00',
      supplier: 'Keshara Minerals and Chemicals ',
      status: 'ACTIVE',
    },
    {
      code: 'KSC-25',
      name: 'Keshara Skim Coat',
      size: '25KG',
      buyingPrice: '700.00',
      sellingPrice: '1100.00',
      supplier: 'Keshara Minerals and Chemicals ',
      status: 'ACTIVE',
    },
    {
      code: 'KTM-30',
      name: 'Keshara Tile Master',
      size: '15KG',
      buyingPrice: '940.00',
      sellingPrice: '1500.00',
      supplier: 'Keshara Minerals and Chemicals ',
      status: 'ACTIVE',
    },
    {
      code: 'KDF-30',
      name: 'Keshara Dollamite Fertilitzer',
      size: '30KG',
      buyingPrice: '450.00',
      sellingPrice: '600.00',
      supplier: 'Keshara Minerals and Chemicals ',
      status: 'ACTIVE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.code}>
        <Table.Td>{element.code}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.size}</Table.Td>
        <Table.Td>{element.buyingPrice}</Table.Td>
        <Table.Td>{element.sellingPrice}</Table.Td>
        <Table.Td>{element.supplier}</Table.Td>
        <Table.Td>
          <Badge color={element.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/suppliers/view-products" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>

              <Link to="/admin/suppliers/add-edit-products" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Product Code</Table.Th>
      <Table.Th>Name </Table.Th>
      <Table.Th>Size</Table.Th>
      <Table.Th>Buying Price</Table.Th>
      <Table.Th>Selling Price</Table.Th>
      <Table.Th>Supplier</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Products</Text>
            </div>
            <Link to="/admin/suppliers/add-edit-products">
              <Button size="sm">Add Product</Button>
            </Link>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Name', 'Supplier']}
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

export default Products;
