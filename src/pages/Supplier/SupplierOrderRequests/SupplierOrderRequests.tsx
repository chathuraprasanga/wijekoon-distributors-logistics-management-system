import {
  Modal,
  SegmentedControl,
  TextInput,
  Table,
  Pagination,
  Grid,
  Button,
  Card,
  Divider,
  Badge,
  Menu,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SupplierOrderRequests() {
  const [activePage, setPage] = useState(1);
  const [activeModelPage, setModelPage] = useState(1);

  const [opened, { open, close }] = useDisclosure(false);

  const elements = [
    {
      orderId: 'WDS-001',
      date: '01/04/2024',
      Supplier: 'Tech Innovations',
      products: '01',
      quantity: '200',
      expectedDate: '18/04/2024',
      purpose: 'For Delivery',
      status: 'PENDING',
    },
    {
      orderId: 'WDS-002',
      date: '02/04/2024',
      Supplier: 'Eco Products',
      products: '02',
      quantity: '150',
      expectedDate: '20/04/2024',
      purpose: 'For Warehouse',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WDS-003',
      date: '03/04/2024',
      Supplier: 'Healthcare Solutions',
      products: '03',
      quantity: '250',
      expectedDate: '22/04/2024',
      purpose: 'For Delivery',
      status: 'REJECTED',
    },
    {
      orderId: 'WDS-004',
      date: '04/04/2024',
      Supplier: 'Fashion Forward',
      products: '04',
      quantity: '300',
      expectedDate: '24/04/2024',
      purpose: 'For Warehouse',
      status: 'CANCELLED',
    },
    {
      orderId: 'WDS-005',
      date: '05/04/2024',
      Supplier: 'Tech Innovations',
      products: '05',
      quantity: '175',
      expectedDate: '26/04/2024',
      purpose: 'For Delivery',
      status: 'PENDING',
    },
    {
      orderId: 'WDS-006',
      date: '06/04/2024',
      Supplier: 'Eco Products',
      products: '01',
      quantity: '225',
      expectedDate: '28/04/2024',
      purpose: 'For Warehouse',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WDS-007',
      date: '07/04/2024',
      Supplier: 'Healthcare Solutions',
      products: '02',
      quantity: '250',
      expectedDate: '30/04/2024',
      purpose: 'For Delivery',
      status: 'REJECTED',
    },
    {
      orderId: 'WDS-008',
      date: '08/04/2024',
      Supplier: 'Fashion Forward',
      products: '03',
      quantity: '275',
      expectedDate: '02/05/2024',
      purpose: 'For Warehouse',
      status: 'CANCELLED',
    },
    {
      orderId: 'WDS-009',
      date: '09/04/2024',
      Supplier: 'Tech Innovations',
      products: '04',
      quantity: '200',
      expectedDate: '04/05/2024',
      purpose: 'For Delivery',
      status: 'PENDING',
    },
    {
      orderId: 'WDS-010',
      date: '10/04/2024',
      Supplier: 'Eco Products',
      products: '05',
      quantity: '150',
      expectedDate: '06/05/2024',
      purpose: 'For Warehouse',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WDS-011',
      date: '11/04/2024',
      Supplier: 'Healthcare Solutions',
      products: '01',
      quantity: '250',
      expectedDate: '08/05/2024',
      purpose: 'For Delivery',
      status: 'REJECTED',
    },
    {
      orderId: 'WDS-012',
      date: '12/04/2024',
      Supplier: 'Fashion Forward',
      products: '02',
      quantity: '300',
      expectedDate: '10/05/2024',
      purpose: 'For Warehouse',
      status: 'CANCELLED',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.Supplier}</Table.Td>
        <Table.Td>{element.products}</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
        <Table.Td>{element.expectedDate}</Table.Td>
        <Table.Td>{element.purpose}</Table.Td>
        <Table.Td>
          <Badge
            color={(() => {
              switch (element.status) {
                case 'PENDING':
                  return 'yellow'; // Assuming yellow for pending
                case 'CONFIRMED':
                  return 'green'; // Assuming blue for confirmed
                case 'CANCELLED':
                  return 'purple'; // Assuming red for cancelled
                case 'REJECTED':
                  return 'red'; // Assuming gray for not completed
                default:
                  return 'gray'; // Default color if status is not recognized
              }
            })()}
            radius="xs"
            size="xs"
          >
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              <Link to="/admin/suppliers/view-order-requests" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/suppliers/edit-order-requests" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Order ID</Table.Th>
      <Table.Th>Date</Table.Th>
      <Table.Th>Supplier</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Quantity</Table.Th>
      <Table.Th>Expected Date</Table.Th>
      <Table.Th>Purpose</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const SupplierReqData = [
    {
      id: 1,
      name: 'Tech Innovations',
      phone: '+1 1234567890',
      email: 'techinnovations@example.com',
      address: '123, lakeside, new york, USA',
      status: 'ACTIVE',
    },
    {
      id: 2,
      name: 'Eco Products',
      phone: '+1 2345678901',
      email: 'ecoproducts@example.com',
      address: '456, main street, chicago, USA',
      status: 'ACTIVE',
    },
    {
      id: 3,
      name: 'Healthcare Solutions',
      phone: '+1 3456789012',
      email: 'healthcaresolutions@example.com',
      address: '789, park avenue, los angeles, USA',
      status: 'ACTIVE',
    },
    {
      id: 4,
      name: 'Fashion Forward',
      phone: '+1 4567890123',
      email: 'fashionforward@example.com',
      address: '1011, oakwood drive, houston, USA',
      status: 'ACTIVE',
    },
  ];

  const modalData = SupplierReqData.slice(0, 5).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.phone}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.address}</Table.Td>
        <Table.Td>
          <Link to="/admin/suppliers/add-order-requests">
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
          Select Supplier to Create Supplier Order Request
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Name', 'Phone', 'Email']}
            defaultValue="Email"
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
              <Table.Th>#</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Address</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Supplier Order Requests</Text>
            </div>
            {/* <Link to="/admin/Suppliers/add-order-requests"> */}
            <Button size="sm" onClick={open}>
              Create Supplier Order Requests
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

export default SupplierOrderRequests;
