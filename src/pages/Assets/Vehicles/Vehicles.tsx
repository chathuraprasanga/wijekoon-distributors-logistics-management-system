import {
  Table,
  Badge,
  Menu,
  Grid,
  Button,
  Card,
  SegmentedControl,
  TextInput,
  Divider,
  Pagination,
  Text,
  Group,
  Modal,
  rem,
} from '@mantine/core';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteVehicle, fetchVehicles, setVehicle } from '@/redux/slices/assetsSlice';
import { RootState } from '@/redux/store';
import { Notifications } from '@mantine/notifications';

function Vehicles() {
  const [opened, setOpened] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [activePage, setPage] = useState(1);
  const vehiclePerPage = 10;
  const navigate = useNavigate();
  const disptach = useDispatch();
  const vehicles = useSelector((state: RootState) => state.assets.vehicles);
  const status = useSelector((state: RootState) => state.assets.status);
  const error = useSelector((state: RootState) => state.assets.error);

  useEffect(() => {
    if (status === 'idle') {
      disptach(fetchVehicles());
    }
  }, [status, disptach]);

  // for search
  const [searchSegment, setSearchSegment] = useState('Vehicle Number');
  const [searchTerm, setSearchTerm] = useState('');

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * vehiclePerPage;
  const end = start + vehiclePerPage;

  const filteredVehicles = vehicles.filter((vehicle: any) => {
    const numberMatches = vehicle.number.toLowerCase().includes(searchTerm.toLowerCase());
    // Add other criteria here
    // Example: const brandMatches = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    // Return numberMatches && brandMatches && ...;
    return numberMatches;
  });

  const displayedvehicles = filteredVehicles.slice(start, end);

  const handleViewEdit = (vehicle: any, action: any) => {
    if (action === 'delete') {
      setVehicleToDelete(vehicle);
      setOpened(true);
    } else {
      disptach(setVehicle(vehicle));
      if (action === 'view') {
        navigate('/admin/vehicles/add-edit');
      } else if (action === 'edit') {
        navigate('/admin/vehicles/add-edit');
      }
    }
  };

  const handleDeleteVehicle = async () => {
    try {
      await disptach(deleteVehicle(vehicleToDelete._id)).unwrap();
      disptach(fetchVehicles());
      setOpened(false);
      Notifications.show({
        title: 'Successful',
        message: 'Vehicle Deleted Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
    } catch (e: any) {
      setOpened(false);
      Notifications.show({
        title: 'Error',
        message: 'There was an error deleting the vehicle',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleVehicleAddBtn = () => {
    disptach(setVehicle(null));
    navigate('/admin/vehicles/add-edit');
  };

  const rows = displayedvehicles.map((element, index) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="10%">{element.vehicleId}</Table.Td>
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
              <Menu.Item onClick={() => handleViewEdit(element, 'view')}>View</Menu.Item>
              <Menu.Item onClick={() => handleViewEdit(element, 'edit')}>Edit</Menu.Item>
              <Menu.Item onClick={() => handleViewEdit(element, 'delete')} color="red">
                Delete
              </Menu.Item>
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
            {/* <Link to="/admin/vehicles/add-edit"> */}
            <Button size="sm" onClick={handleVehicleAddBtn}>
              Add Vehicle
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
                data={['Vehicle Number']}
                defaultValue="Vehicle Number"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredVehicles.length / vehiclePerPage)}
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
        <Text>Are you sure you want to delete the customer {vehicleToDelete?.number}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteVehicle}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Vehicles;
