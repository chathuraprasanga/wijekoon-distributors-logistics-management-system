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
  Modal,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Trips() {
  const [activePage, setPage] = useState(1);
  const [activeModelPage, setModelPage] = useState(1);

  const [opened, { open, close }] = useDisclosure(false);

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
          <Link to="/admin/trips/add-edit">
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
          Select Supplier Order Request to Create Trip
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
              <Text style={{ fontWeight: 'bold' }}>Trips</Text>
            </div>
            <Button size="sm" onClick={open}>Create Trip</Button>
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
