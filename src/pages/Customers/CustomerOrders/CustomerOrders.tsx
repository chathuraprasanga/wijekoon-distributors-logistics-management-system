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

function CustomerOrders() {
  const [activePage, setPage] = useState(1);
  const [activeModelPage, setModelPage] = useState(1);

  const [opened, { open, close }] = useDisclosure(false);

  const elements = [
    {
      orderId: 'WD-144',
      date: '13/04/2024',
      customer: 'Chathura Prasanga',
      phone: '077 9250108',
      products: '04',
      qty: '200',
      amount: '125000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-143',
      date: '13/04/2024',
      customer: 'Star Hardware Store',
      phone: '077 0943040',
      products: '03',
      qty: '350',
      amount: '150000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-142',
      date: '13/04/2024',
      customer: 'John Doe',
      phone: '077 1234567',
      products: '02',
      qty: '150',
      amount: '75000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-141',
      date: '13/04/2024',
      customer: 'Jane Smith',
      phone: '077 2345678',
      products: '01',
      qty: '200',
      amount: '80000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-140',
      date: '13/04/2024',
      customer: 'Alice Johnson',
      phone: '077 3456789',
      products: '03',
      qty: '100',
      amount: '45000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-139',
      date: '13/04/2024',
      customer: 'Bob Brown',
      phone: '077 4567890',
      products: '04',
      qty: '50',
      amount: '22500.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-138',
      date: '13/04/2024',
      customer: 'Charlie Davis',
      phone: '077 5678901',
      products: '03',
      qty: '150',
      amount: '75000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-137',
      date: '13/04/2024',
      customer: 'Diana White',
      phone: '077 6789012',
      products: '01',
      qty: '200',
      amount: '80000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-136',
      date: '13/04/2024',
      customer: 'Eva Black',
      phone: '077 7890123',
      products: '02',
      qty: '150',
      amount: '75000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-135',
      date: '13/04/2024',
      customer: 'Frank Green',
      phone: '077 8901234',
      products: '03',
      qty: '100',
      amount: '45000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-134',
      date: '13/04/2024',
      customer: 'Grace Blue',
      phone: '077 9012345',
      products: '04',
      qty: '50',
      amount: '22500.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-133',
      date: '13/04/2024',
      customer: 'Harry Red',
      phone: '077 0123456',
      products: '02',
      qty: '150',
      amount: '75000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-132',
      date: '13/04/2024',
      customer: 'Ivy Yellow',
      phone: '077 1234567',
      products: '01',
      qty: '200',
      amount: '80000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-131',
      date: '13/04/2024',
      customer: 'Jack Orange',
      phone: '077 2345678',
      products: '02',
      qty: '150',
      amount: '75000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-130',
      date: '13/04/2024',
      customer: 'Kate Purple',
      phone: '077 3456789',
      products: '03',
      qty: '100',
      amount: '45000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-129',
      date: '13/04/2024',
      customer: 'Liam Pink',
      phone: '077 4567890',
      products: '04',
      qty: '50',
      amount: '22500.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-128',
      date: '13/04/2024',
      customer: 'Mia Brown',
      phone: '077 5678901',
      products: '03',
      qty: '150',
      amount: '75000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-127',
      date: '13/04/2024',
      customer: 'Noah Green',
      phone: '077 6789012',
      products: '01',
      qty: '200',
      amount: '80000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-126',
      date: '13/04/2024',
      customer: 'Olivia Blue',
      phone: '077 7890123',
      products: '02',
      qty: '150',
      amount: '75000.00',
      status: 'NOT PAID',
    },
    {
      orderId: 'WD-125',
      date: '13/04/2024',
      customer: 'Peter Red',
      phone: '077 8901234',
      products: '03',
      qty: '100',
      amount: '45000.00',
      status: 'PAID',
    },
    {
      orderId: 'WD-124',
      date: '13/04/2024',
      customer: 'Quinn Yellow',
      phone: '077 9012345',
      products: '04',
      qty: '50',
      amount: '22500.00',
      status: 'NOT PAID',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.customer}</Table.Td>
        <Table.Td>{element.products}</Table.Td>
        <Table.Td>{element.qty}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>
          <Badge color={element.status === 'PAID' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/customers/view-orders" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Customer</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Qty</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const customerReqData = [
    {
      orderId: 'WD-114',
      date: '01/04/2024',
      name: 'Chathura Prasanga',
      product: '04',
      quantity: 1,
      amount: '125000.00',
    },
    {
      orderId: 'WD-113',
      date: '02/04/2024',
      name: 'John Doe',
      product: '03',
      quantity: 2,
      amount: '100000.00',
    },
    {
      orderId: 'WD-112',
      date: '03/04/2024',
      name: 'Jane Smith',
      product: '02',
      quantity: 3,
      amount: '75000.00',
    },
    {
      orderId: 'WD-111',
      date: '04/04/2024',
      name: 'Alice Johnson',
      product: '01',
      quantity: 4,
      amount: '50000.00',
    },
    {
      orderId: 'WD-110',
      date: '05/04/2024',
      name: 'Bob Brown',
      product: '00',
      quantity: 5,
      amount: '25000.00',
    },
    {
      orderId: 'WD-109',
      date: '06/04/2024',
      name: 'Charlie Davis',
      product: '04',
      quantity: 1,
      amount: '125000.00',
    },
    {
      orderId: 'WD-108',
      date: '07/04/2024',
      name: 'Diana White',
      product: '03',
      quantity: 2,
      amount: '100000.00',
    },
    {
      orderId: 'WD-107',
      date: '08/04/2024',
      name: 'Eva Black',
      product: '02',
      quantity: 3,
      amount: '75000.00',
    },
    {
      orderId: 'WD-106',
      date: '09/04/2024',
      name: 'Frank Green',
      product: '01',
      quantity: 4,
      amount: '50000.00',
    },
    {
      orderId: 'WD-105',
      date: '10/04/2024',
      name: 'Grace Blue',
      product: '00',
      quantity: 5,
      amount: '25000.00',
    },
    {
      orderId: 'WD-104',
      date: '11/04/2024',
      name: 'Harry Red',
      product: '04',
      quantity: 1,
      amount: '125000.00',
    },
    {
      orderId: 'WD-103',
      date: '12/04/2024',
      name: 'Ivy Yellow',
      product: '03',
      quantity: 2,
      amount: '100000.00',
    },
    {
      orderId: 'WD-102',
      date: '13/04/2024',
      name: 'Jack Orange',
      product: '02',
      quantity: 3,
      amount: '75000.00',
    },
    {
      orderId: 'WD-101',
      date: '14/04/2024',
      name: 'Kate Purple',
      product: '01',
      quantity: 4,
      amount: '50000.00',
    },
    {
      orderId: 'WD-100',
      date: '15/04/2024',
      name: 'Liam Pink',
      product: '00',
      quantity: 5,
      amount: '25000.00',
    },
    {
      orderId: 'WD-099',
      date: '16/04/2024',
      name: 'Mia Brown',
      product: '04',
      quantity: 1,
      amount: '125000.00',
    },
    {
      orderId: 'WD-098',
      date: '17/04/2024',
      name: 'Noah Green',
      product: '03',
      quantity: 2,
      amount: '100000.00',
    },
    {
      orderId: 'WD-097',
      date: '18/04/2024',
      name: 'Olivia Blue',
      product: '02',
      quantity: 3,
      amount: '75000.00',
    },
    {
      orderId: 'WD-096',
      date: '19/04/2024',
      name: 'Peter Red',
      product: '01',
      quantity: 4,
      amount: '50000.00',
    },
  ];

  const modalData = customerReqData.slice(0, 5).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.product}</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>
          <Link to="/admin/customers/add-orders">
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
          Select Customer Order Request to Create Customer Order
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Order ID', 'Date', 'Customer']}
            defaultValue="Customer"
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
              <Table.Th>Customer</Table.Th>
              <Table.Th>Products</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
            {modalData}
          </Table>
          <Pagination
            total={customerReqData.length / 5}
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
              <Text style={{ fontWeight: 'bold' }}>Customer Order </Text>
            </div>
            {/* <Link to="/admin/customers/add-orders"> */}
            <Button size="sm" onClick={open}>
              Create Customer Order
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
                data={['Order ID', 'Customer']}
                defaultValue="Customer"
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

export default CustomerOrders;
