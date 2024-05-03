import {
  Grid,
  Button,
  Card,
  Table,
  Pagination,
  Text,
  Badge,
  Menu,
  Modal,
  TextInput,
  SegmentedControl,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupplierOrders() {
  const [activePage, setPage] = useState(1);
  const [activeModelPage, setModelPage] = useState(1);

  const [opened, { open, close }] = useDisclosure(false);

  const elements = [
    {
      orderId: 'WDS-1',
      date: '13/04/2024',
      supplier: 'Keshara Minerals and Chemicals',
      purpose: 'For Delivery',
      products: '02',
      qty: '223',
      amount: '186500.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-2',
      date: '14/04/2024',
      supplier: 'ABC Suppliers',
      purpose: 'For Warehouse',
      products: '03',
      qty: '547',
      amount: '300000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WDS-3',
      date: '15/04/2024',
      supplier: 'XYZ Distributors',
      purpose: 'For Delivery',
      products: '04',
      qty: '482',
      amount: '324000.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-4',
      date: '16/04/2024',
      supplier: 'PQR Industries',
      purpose: 'For Warehouse',
      products: '01',
      qty: '345',
      amount: '150000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WDS-5',
      date: '17/04/2024',
      supplier: 'LMN Enterprises',
      purpose: 'For Delivery',
      products: '03',
      qty: '812',
      amount: '250000.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-6',
      date: '18/04/2024',
      supplier: 'Keshara Minerals and Chemicals',
      purpose: 'For Warehouse',
      products: '02',
      qty: '433',
      amount: '175000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WDS-7',
      date: '19/04/2024',
      supplier: 'ABC Suppliers',
      purpose: 'For Delivery',
      products: '01',
      qty: '194',
      amount: '105000.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-8',
      date: '20/04/2024',
      supplier: 'XYZ Distributors',
      purpose: 'For Warehouse',
      products: '02',
      qty: '293',
      amount: '200000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WDS-9',
      date: '21/04/2024',
      supplier: 'PQR Industries',
      purpose: 'For Delivery',
      products: '03',
      qty: '512',
      amount: '275000.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-10',
      date: '22/04/2024',
      supplier: 'LMN Enterprises',
      purpose: 'For Warehouse',
      products: '04',
      qty: '707',
      amount: '350000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WDS-11',
      date: '23/04/2024',
      supplier: 'Keshara Minerals and Chemicals',
      purpose: 'For Delivery',
      products: '01',
      qty: '129',
      amount: '80000.00',
      status: 'PAID',
    },
    {
      orderId: 'WDS-12',
      date: '24/04/2024',
      supplier: 'ABC Suppliers',
      purpose: 'For Warehouse',
      products: '02',
      qty: '251',
      amount: '175000.00',
      status: 'NOT PAID',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td width="10%">{element.orderId}</Table.Td>
        <Table.Td width="10%">{element.date}</Table.Td>
        <Table.Td width="20%">{element.supplier}</Table.Td>

        <Table.Td width="5%">{element.products}</Table.Td>
        <Table.Td width="5%">{element.qty}</Table.Td>
        <Table.Td width="15%">{element.amount}</Table.Td>
        <Table.Td width="15%">{element.purpose}</Table.Td>
        <Table.Td width="10%">
          <Badge color={element.status === 'PAID' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td width="10%">
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/suppliers/view-orders" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Order ID</Table.Th>
      <Table.Th>Date </Table.Th>
      <Table.Th>Supplier</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Qty</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Purpose</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const SupplierReqData = [
    {
      orderId: 'WDS-114',
      date: '01/04/2024',
      name: 'Chathura Prasanga',
      purpose: 'For Delivery',
      product: '04',
      quantity: 1,
      amount: '125000.00',
    },
  ];

  const modalData = SupplierReqData.slice(0, 5).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.product}</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>{element.purpose}</Table.Td>
        <Table.Td>
          <Link to="/admin/suppliers/add-orders">
            <Button size="xs">Select</Button>
          </Link>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Supplier Order Request to Create Supplier Order
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Order ID', 'Date', 'Supplier']}
            defaultValue="Supplier"
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Serach"
            rightSection={<IconSearch size="20" color="gray" />}
          />
        </div>
        <div>
          <Table>
            <Table.Tr>
              <Table.Th>Order ID</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Products</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Purpose</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
            {modalData}
          </Table>
          <Pagination
            total={SupplierReqData.length / 5}
            value={activeModelPage}
            onChange={setModelPage}
            mt={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            size="xs"
          />
        </div>
      </Modal>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Supplier Order </Text>
            </div>
            {/* <Link to="/admin/Suppliers/add-orders"> */}
            <Button size="sm" onClick={open}>
              Create Supplier Order
            </Button>
            {/* </Link> */}
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Order ID', 'Supplier']}
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

export default SupplierOrders;
