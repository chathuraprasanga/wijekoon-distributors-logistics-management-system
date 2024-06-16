import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Modal,
  Pagination,
  SegmentedControl,
  Select,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowLeft,
  IconCheck,
  IconSearch,
  IconTrack,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTrips, setTrip } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import { updateWarehouse } from '@/redux/slices/assetsSlice';
import { Notifications } from '@mantine/notifications';

function StockReceiveWarehouse() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trips = useSelector((state: RootState) => state.trips.trips);
  const trip = useSelector((state: RootState) => state.trips.trip);
  const warehouse = useSelector((state: RootState) => state.assets.warehouse);

  const [activeModalPage, setModalPage] = useState(1);
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  // pagination for modal
  const tripsPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * tripsPerPage;
  const endModal = startModal + tripsPerPage;

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Customer');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredTrips = trips.filter((trip: any) => {
    const value = modalSearchSegment === 'Driver' ? trip.driver.name : trip.tripId;
    return value && value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displayedTrips = filteredTrips.slice(startModal, endModal);

  const handleSelect = (element) => {
    dispatch(setTrip(element));
    close();
  };

  const handleUpdateStock = async () => {
    const payload: any = {};
    payload.warehouse = warehouse;
    payload.trip = trip;
    payload.type = 'increment';
    payload.id = warehouse._id;
    console.log(payload);

    try {
      await dispatch(updateWarehouse(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer order created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      navigate('/admin/assets/warehouses');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer order',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const modalData = displayedTrips?.map((element, index) => (
    <>
      <Table.Tr key={element.tripId}>
        <Table.Td>{element?.tripId}</Table.Td>
        <Table.Td>{element?.createdAt?.split('T')[0]}</Table.Td>
        <Table.Td>{element?.driver?.name}</Table.Td>
        <Table.Td>{element?.products}</Table.Td>
        <Table.Td>{element?.quantity}</Table.Td>
        <Table.Td>{element?.supplierOrder?.supplierOrderRequest?.totalSize} KG</Table.Td>
        <Table.Td>
          {/* <Link to="/admin/customers/add-orders"> */}
          <Button size="xs" onClick={() => handleSelect(element)}>
            Select
          </Button>
          {/* </Link> */}
        </Table.Td>
      </Table.Tr>
    </>
  ));
  console.log(trip);

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Stock Receive
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Trip Details</Text>
            <Table withRowBorders={false} mt={10}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Trip ID:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">{trip?.tripId || '-'}</Table.Td>
                <Table.Td width="15%">
                  {/* <Text fw="bold" size="sm">
                    Trip ID:
                  </Text> */}
                </Table.Td>
                <Table.Td width="35%" style={{ float: 'right' }}>
                  <Button size="xs" onClick={open}>
                    Select Trip
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Driver:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">{trip?.driver?.name || '-'}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    TripDate:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">{trip?.createdAt?.split('T')[0]}</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Stock Receive Details</Text>
            <Table withRowBorders withColumnBorders withTableBorder mt={10}>
              <Table.Tr>
                <Table.Th width="20%">Product ID</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Product Price</Table.Th>
                <Table.Th>Product Quantity</Table.Th>
              </Table.Tr>
              {trip?.supplierOrder?.supplierOrderRequest?.order.map((item, index) => (
                <>
                  <Table.Tr key={item._id}>
                    <Table.Td width="20%">{item?.product.code}</Table.Td>
                    <Table.Td width="20%">{item?.product.name}</Table.Td>
                    <Table.Td width="15%">{item?.product.size} KG</Table.Td>
                    <Table.Td width="20%">{item?.product.sellingPrice.toFixed(2)}</Table.Td>
                    <Table.Td width="20%">{item?.quantity}</Table.Td>
                  </Table.Tr>
                </>
              ))}
              <Table.Tr>
                <Table.Td width="20%" colSpan={3}></Table.Td>
                <Table.Td>Total Quantity: </Table.Td>
                <Table.Td>{trip?.quantity}</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Button style={{ float: 'right' }} onClick={handleUpdateStock}>
              Update Stock
            </Button>
          </div>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Customer Order Request to Create Customer Order
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Trip ID', 'Driver']}
            defaultValue="Driver"
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
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Driver</Table.Th>
                <Table.Th>Products</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Total Size</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {modalData.length > 0 ? (
                modalData
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
            total={Math.ceil(trips.length / tripsPerPage)}
            value={activeModalPage}
            onChange={handleModalPageChange}
            mt={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            size="xs"
          />
        </div>
      </Modal>
    </>
  );
}

export default StockReceiveWarehouse;
