import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  Modal,
  Pagination,
  SegmentedControl,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomerOrderRequests() {
  const [activePage, setPage] = useState(1);
  const [activeModelPage, setModelPage] = useState(1);

  const [opened, { open, close }] = useDisclosure(false);

  const elements = [
    {
      orderId: 'WD-117',
      date: '01/04/2024',
      customer: 'Chathura Prasanga',
      products: '04',
      quantity: '200',
      expectedDate: '18/04/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-118',
      date: '02/04/2024',
      customer: 'Sarath Kumara',
      products: '02',
      quantity: '150',
      expectedDate: '19/04/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-119',
      date: '03/04/2024',
      customer: 'Nimal Perera',
      products: '04',
      quantity: '250',
      expectedDate: '20/04/2024',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WD-120',
      date: '04/04/2024',
      customer: 'Kamal Silva',
      products: '02',
      quantity: '300',
      expectedDate: '21/04/2024',
      status: 'CANCELLED',
    },
    {
      orderId: 'WD-121',
      date: '05/04/2024',
      customer: 'Dinuka Fernando',
      products: '04',
      quantity: '350',
      expectedDate: '22/04/2024',
      status: 'COMPLETED',
    },
    {
      orderId: 'WD-122',
      date: '06/04/2024',
      customer: 'Roshan Fernando',
      products: '03',
      quantity: '400',
      expectedDate: '23/04/2024',
      status: 'NOT COMPLETED',
    },
    {
      orderId: 'WD-123',
      date: '07/04/2024',
      customer: 'Dilshan Perera',
      products: '01',
      quantity: '450',
      expectedDate: '24/04/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-124',
      date: '08/04/2024',
      customer: 'Kasun Silva',
      products: '02',
      quantity: '500',
      expectedDate: '25/04/2024',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WD-125',
      date: '09/04/2024',
      customer: 'Niroshan Fernando',
      products: '01',
      quantity: '550',
      expectedDate: '26/04/2024',
      status: 'CANCELLED',
    },
    {
      orderId: 'WD-126',
      date: '10/04/2024',
      customer: 'Dinuka Fernando',
      products: '02',
      quantity: '600',
      expectedDate: '27/04/2024',
      status: 'COMPLETED',
    },
    {
      orderId: 'WD-127',
      date: '11/04/2024',
      customer: 'Roshan Fernando',
      products: '04',
      quantity: '650',
      expectedDate: '28/04/2024',
      status: 'NOT COMPLETED',
    },
    {
      orderId: 'WD-128',
      date: '12/04/2024',
      customer: 'Dilshan Perera',
      products: '02',
      quantity: '700',
      expectedDate: '29/04/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-129',
      date: '13/04/2024',
      customer: 'Kasun Silva',
      products: '03',
      quantity: '750',
      expectedDate: '30/04/2024',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WD-130',
      date: '14/04/2024',
      customer: 'Niroshan Fernando',
      products: '04',
      quantity: '800',
      expectedDate: '01/05/2024',
      status: 'CANCELLED',
    },
    {
      orderId: 'WD-131',
      date: '15/04/2024',
      customer: 'Dinuka Fernando',
      products: '02',
      quantity: '850',
      expectedDate: '02/05/2024',
      status: 'COMPLETED',
    },
    {
      orderId: 'WD-132',
      date: '16/04/2024',
      customer: 'Roshan Fernando',
      products: '03',
      quantity: '900',
      expectedDate: '03/05/2024',
      status: 'NOT COMPLETED',
    },
    {
      orderId: 'WD-133',
      date: '17/04/2024',
      customer: 'Dilshan Perera',
      products: '04',
      quantity: '950',
      expectedDate: '04/05/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-134',
      date: '18/04/2024',
      customer: 'Kasun Silva',
      products: '05',
      quantity: '1000',
      expectedDate: '05/05/2024',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WD-135',
      date: '19/04/2024',
      customer: 'Niroshan Fernando',
      products: '01',
      quantity: '1050',
      expectedDate: '06/05/2024',
      status: 'CANCELLED',
    },
    {
      orderId: 'WD-136',
      date: '20/04/2024',
      customer: 'Dinuka Fernando',
      products: '02',
      quantity: '1100',
      expectedDate: '07/05/2024',
      status: 'COMPLETED',
    },
    {
      orderId: 'WD-137',
      date: '21/04/2024',
      customer: 'Roshan Fernando',
      products: '03',
      quantity: '1150',
      expectedDate: '08/05/2024',
      status: 'NOT COMPLETED',
    },
    {
      orderId: 'WD-138',
      date: '22/04/2024',
      customer: 'Dilshan Perera',
      products: '01',
      quantity: '1200',
      expectedDate: '09/05/2024',
      status: 'PENDING',
    },
    {
      orderId: 'WD-139',
      date: '23/04/2024',
      customer: 'Kasun Silva',
      products: '05',
      quantity: '1250',
      expectedDate: '10/05/2024',
      status: 'CONFIRMED',
    },
    {
      orderId: 'WD-140',
      date: '24/04/2024',
      customer: 'Niroshan Fernando',
      products: '02',
      quantity: '1300',
      expectedDate: '11/05/2024',
      status: 'CANCELLED',
    },
    {
      orderId: 'WD-141',
      date: '25/04/2024',
      customer: 'Dinuka Fernando',
      products: '03',
      quantity: '1350',
      expectedDate: '12/05/2024',
      status: 'COMPLETED',
    },
    {
      orderId: 'WD-142',
      date: '26/04/2024',
      customer: 'Roshan Fernando',
      products: '04',
      quantity: '1400',
      expectedDate: '13/05/2024',
      status: 'NOT COMPLETED',
    },
    {
      orderId: 'WD-143',
      date: '27/04/2024',
      customer: 'Dilshan Perera',
      products: '05',
      quantity: '1450',
      expectedDate: '14/05/2024',
      status: 'PENDING',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.orderId}>
        <Table.Td>{element.orderId}</Table.Td>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.customer}</Table.Td>
        <Table.Td>{element.products}</Table.Td>
        <Table.Td>{element.quantity}</Table.Td>
        <Table.Td>{element.expectedDate}</Table.Td>
        <Table.Td>
          <Badge
            color={(() => {
              switch (element.status) {
                case 'PENDING':
                  return 'yellow'; // Assuming yellow for pending
                case 'CONFIRMED':
                  return 'green'; // Assuming blue for confirmed
                case 'CANCELLED':
                  return 'red'; // Assuming red for cancelled
                case 'COMPLETED':
                  return 'blue'; // Assuming green for completed
                case 'NOT COMPLETED':
                  return 'purple'; // Assuming gray for not completed
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
              <Link to="/admin/customers/view-order-requests" style={{ textDecoration: 'none' }}>
                <Menu.Item>View</Menu.Item>
              </Link>
              <Link to="/admin/customers/edit-order-requests" style={{ textDecoration: 'none' }}>
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
      <Table.Th>Customer</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Quantity</Table.Th>
      <Table.Th>Expected Date</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const customerReqData = [
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
    ];

  const modalData = customerReqData.slice(0, 5).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.phone}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.address}</Table.Td>
        <Table.Td>
          <Link to="/admin/customers/add-order-requests">
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
          Select Customer to Create Customer Order Request
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
              <Table.Th>Customer</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Address</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Customer Order Requests</Text>
            </div>
            {/* <Link to="/admin/customers/add-order-requests"> */}
              <Button size="sm" onClick={open}>Create Customer Order Requests</Button>
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

export default CustomerOrderRequests;
