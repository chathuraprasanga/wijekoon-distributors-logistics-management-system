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
  rem,
  Group,
  Modal,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWarehouses, setWarehouse, updateWarehouse } from '@/redux/slices/assetsSlice';
import { RootState } from '@/redux/store';

function Warehouses() {
  const [opened, setOpened] = useState(false);
  const [warehouseToDeactivate, setWarehouseToDeactivate] = useState(null);
  const [activePage, setPage] = useState(1);
  const warehousePerPage = 10;
  const navigate = useNavigate();
  const disptach = useDispatch();
  const warehouses = useSelector((state: RootState) => state.assets.warehouses);
  const status = useSelector((state: RootState) => state.assets.status);
  const error = useSelector((state: RootState) => state.assets.error);

  useEffect(() => {
    disptach(fetchWarehouses());
  }, [disptach]);

  // for search
  const [searchSegment, setSearchSegment] = useState('City');
  const [searchTerm, setSearchTerm] = useState('');

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * warehousePerPage;
  const end = start + warehousePerPage;

  const filteredWarehouses = warehouses.filter((warehouse: any) => {
    const numberMatches = warehouse.city.toLowerCase().includes(searchTerm.toLowerCase());
    // Add other criteria here
    // Example: const brandMatches = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    // Return numberMatches && brandMatches && ...;
    return numberMatches;
  });

  const handleViewEdit = (warehouse: any, action: any) => {
    if (action === 'deactivate') {
      setWarehouseToDeactivate(warehouse);
      setOpened(true);
    } else {
      disptach(setWarehouse(warehouse));
      if (action === 'view') {
        navigate('/admin/assets/view-warehouses');
      } else if (action === 'edit') {
        navigate('/admin/assets/add-edit-warehouses');
      }
    }
  };

  const handleDeactivate = async () => {
    try {
      const status = warehouseToDeactivate?.status === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';
      const payload = { ...warehouseToDeactivate, status: status };
      await disptach(updateWarehouse(payload)).unwrap();
      disptach(fetchWarehouses());
      setOpened(false);
      Notifications.show({
        title: 'Successful',
        message: 'Warehouse status updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
    } catch (e: any) {
      setOpened(false);
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the warehouse status',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleAddWarehouseAddBtn = () => {
    disptach(setWarehouse(null));
    navigate('/admin/assets/add-edit-warehouses');
  };

  const displayedWarehouses = filteredWarehouses.slice(start, end);

  const rows = displayedWarehouses.map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="10%">{element.warehouseId}</Table.Td>
        <Table.Td width="20%">{element.city}</Table.Td>
        <Table.Td width="35%">{element.address}</Table.Td>
        <Table.Td width="10%">{element.stockDetails.length}</Table.Td>
        <Table.Td width="10%">
          {element.stockDetails.reduce((sum, item) => sum + parseInt(item.quantity, 10), 0)}
        </Table.Td>
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
              <Menu.Item onClick={() => handleViewEdit(element, 'view')}>View</Menu.Item>
              {/* <Menu.Item onClick={() => handleViewEdit(element, 'edit')}>Edit</Menu.Item> */}
              <Menu.Item
                onClick={() => handleViewEdit(element, 'deactivate')}
                color={element?.status === 'ACTIVE' ? 'red' : 'green'}
              >
                {element?.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
              </Menu.Item>
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
            {/* <Link to="/admin/assets/add-edit-warehouses"> */}
            <Button size="sm" onClick={handleAddWarehouseAddBtn}>
              Add Warehouse
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
                data={['City']}
                defaultValue="City"
                value={searchSegment}
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>

            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredWarehouses.length / warehousePerPage)}
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
        <Text>
          Are you sure you want to deactivate the warehouse {warehouseToDeactivate?.warehouseId}?
        </Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color={warehouseToDeactivate?.status === 'ACTIVE' ? 'red' : 'green'}
            onClick={handleDeactivate}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Warehouses;
