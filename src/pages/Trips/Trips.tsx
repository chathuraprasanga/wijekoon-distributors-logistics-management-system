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
  Group,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTrips, setTrip, updateTrip } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import { fetchSupplierOrders } from '@/redux/slices/supplierSlice';

function Trips() {
  const [activePage, setPage] = useState(1);
  const [tripToUpdate, setTripToUpdate] = useState(null);
  const [activeModalPage, setModalPage] = useState(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.trips.status);
  const supplierOrders = useSelector((state: RootState) => state.suppliers.supplierOrders);
  const trips = useSelector((state: RootState) => state.trips.trips);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const tripsPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };
  const startMain = (activePage - 1) * tripsPerPage;
  const endMain = startMain + tripsPerPage;

  // pagination for modal
  const ordersPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * ordersPerPage;
  const endModal = startModal + ordersPerPage;

  // for search
  const [searchSegment, setSearchSegment] = useState('Trip ID');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering customers based on search
  const filteredTrips = trips.filter((request: any) => {
    const value =
      searchSegment === 'Driver'
        ? request.driver?.name
        : searchSegment === 'Vehicle Number'
          ? request?.vehicle?.number
          : request.tripId;
    return value?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Supplier');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredSupplierOrders = supplierOrders.filter((order: any) => {
    const value =
      modalSearchSegment === 'Order ID'
        ? order?.supplierOrderRequest?.orderId
        : order.supplierOrderRequest.supplier?.name;
    return value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displayedSupplierOrders = filteredSupplierOrders.slice(startModal, endModal);

  const displayedTrips = filteredTrips.slice(startMain, endMain);

  useEffect(() => {
    dispatch(fetchTrips());
    dispatch(setTrip(null));
    dispatch(fetchSupplierOrders());
  }, [dispatch]);

  const handleSelect = (element: any) => {
    dispatch(setTrip(element));
    navigate('/admin/trips/add-edit');
  };

  const handleView = (element: any) => {
    dispatch(setTrip(element));
    navigate('/admin/trips/view');
  };

  const handleCancel = (element: any) => {
    dispatch(setTrip(element));
    setTripToUpdate(element);
    setOpened(true);
  };

  const handleUpdateTrip = async () => {
    try {
      const payload = { _id: tripToUpdate._id, status: 'CANCELLED' };
      await dispatch(updateTrip(payload)).unwrap();
      dispatch(fetchTrips());
      setOpened(false);
      Notifications.show({
        title: 'Successful',
        message: 'Trip Status Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
    } catch (e: any) {
      setOpened(false);
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Trip',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const rows = displayedTrips.map((element, index) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td>{element.tripId}</Table.Td>
        <Table.Td>{element.date?.split('T')[0]}</Table.Td>
        <Table.Td>{element.vehicle?.number}</Table.Td>
        <Table.Td>{element.driver?.name}</Table.Td>
        <Table.Td>{element.supplierOrder?.supplierOrderRequest?.order.length}</Table.Td>
        <Table.Td>{element.supplierOrder?.supplierOrderRequest?.totalQuantity}</Table.Td>
        <Table.Td style={{ textTransform: 'capitalize' }}>
          {element.supplierOrder?.supplierOrderRequest?.purpose}
        </Table.Td>
        <Table.Td>
          <Badge
            color={
              element.status === 'ACTIVE'
                ? 'green'
                : element.status === 'COMPLETED'
                  ? 'blue'
                  : 'red'
            }
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
              {/* <Link to="/admin/trips/view" style={{ textDecoration: 'none' }}> */}
              <Menu.Item onClick={() => handleView(element)}>View</Menu.Item>
              {/* </Link> */}
              {/* <Link to="/admin/trips/add-edit" style={{ textDecoration: 'none' }}> */}
              {/* <Menu.Item>Edit</Menu.Item> */}
              {/* </Link> */}
              {element.status === 'ACTIVE' && (
                <Menu.Item color="red" onClick={() => handleCancel(element)}>
                  Cancel
                </Menu.Item>
              )}
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

  const modalData = filteredSupplierOrders.map((element, index) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td>{element?.supplierOrderRequest?.orderId}</Table.Td>
        <Table.Td>{element?.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.supplier?.name}</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.order.length}</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.totalQuantity}</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.totalSize} KG</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.netTotal?.toFixed(2)}</Table.Td>
        <Table.Td>{element?.supplierOrderRequest?.purpose}</Table.Td>
        <Table.Td>
          {/* <Link to="/admin/trips/add-edit"> */}
          <Button size="xs" onClick={() => handleSelect(element)}>
            Select
          </Button>
          {/* </Link> */}
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      {/* <Modal opened={opened} onClose={close} withCloseButton={false} size="90%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Supplier Order Request to Create Trip
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Order ID', 'Supplier']}
            defaultValue="Supplier"
            onChange={setModalSearchSegment}
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Serach"
            rightSection={<IconSearch size="20" color="gray" />}
            onChange={(event) => setModalSearchTerm(event.currentTarget.value)}
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
              <Table.Th>Total Size</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Purpose</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
            {modalData}
          </Table>
          <Pagination
            total={Math.ceil(filteredSupplierOrders.length / ordersPerPage)}
            value={activeModalPage}
            onChange={handleModalPageChange}
            mt={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            size="xs"
          />
        </div>
      </Modal> */}

      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Trips</Text>
            </div>
            {/* <Button size="sm" onClick={open}>
              Create Trip
            </Button> */}
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Vehicle Number', 'Driver', 'Trip ID']}
                defaultValue="Trip ID"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                rightSection={<IconSearch />}
                placeholder="Search"
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={10}>
                      <Text color="dimmed" align="center">
                        No data found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredTrips.length / tripsPerPage)}
              value={activePage}
              onChange={handlePageChange}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to Cancel the Trip {tripToUpdate?.tripId}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleUpdateTrip}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Trips;
