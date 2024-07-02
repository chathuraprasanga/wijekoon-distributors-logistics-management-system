import { fetchExpenses, setExpense, setTrip } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import {
  Grid,
  Button,
  Text,
  Card,
  Divider,
  SegmentedControl,
  TextInput,
  Table,
  Menu,
  Modal,
  Pagination,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Trips from '../Trips';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function Expenses() {
  const [activePage, setPage] = useState(1);
  const [activeModalPage, setModalPage] = useState(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.trips.status);
  const expenses = useSelector((state: RootState) => state.trips.expenses);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
  console.log(trips);

  // due to the permission handler is not works
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];

  const hasPrivilege = (permission: string) => {
    try {
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking privilege:', error);
      return false;
    }
  };

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
  };

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  // pagination for main
  const expensesPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };
  const startMain = (activePage - 1) * expensesPerPage;
  const endMain = startMain + expensesPerPage;

  // for search
  const [searchSegment, setSearchSegment] = useState('Trip ID');
  const [searchTerm, setSearchTerm] = useState('');

  // filtering suppliers based on search
  const filteredExpenses = expenses.filter((request: any) => {
    const value = request?.tripId?.tripId;
    return value?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  const displayedExpenses = filteredExpenses.slice(startMain, endMain);

  const handleView = (data: any) => {
    dispatch(setExpense(data));
    navigate('/admin/expenses/view');
  };

  const handleEdit = (data: any) => {
    dispatch(setExpense(data));
    navigate('/admin/expenses/add-edit');
  };

  // pagination for modal
  const tripsPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * tripsPerPage;
  const endModal = startModal + tripsPerPage;

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Trip ID');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredTrips = trips.filter((trip: any) => {
    const value = modalSearchSegment === 'Driver' ? trip.driver?.name : trip.tripId;
    return value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displayedTrips = filteredTrips.slice(startModal, endModal);

  const handleSelect = (trip) => {
    dispatch(setTrip(trip));
    navigate('/admin/expenses/add-edit');
    dispatch(setExpense(null));
  };

  const tds = displayedExpenses.map((data) => (
    <>
      <Table.Tr key={data._id}>
        <Table.Td>{data.tripId.tripId}</Table.Td>
        <Table.Td>{data.tripId.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{data?.tripId?.vehicle?.number || 'N/A'}</Table.Td>
        <Table.Td>{data?.tripId?.driver?.name || 'N/A'}</Table.Td>
        <Table.Td style={{ textTransform: 'capitalize' }}>
          {data?.tripId?.supplierOrder?.supplierOrderRequest?.purpose}
        </Table.Td>
        <Table.Td>LKR {data?.totalAmount?.toFixed(2)}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Link to="/admin/expenses/view" style={{ textDecoration: 'none' }}> */}
              {hasPrivilege('VIEW_EXPENSES') && (
                <Menu.Item onClick={() => handleView(data)}>View</Menu.Item>
              )}
              {/* </Link> */}
              {/* <Link to="/admin/expenses/add-edit" style={{ textDecoration: 'none' }}> */}
              {hasPrivilege('EDIT_EXPENSES') && (
                <Menu.Item onClick={() => handleEdit(data)}>Edit</Menu.Item>
              )}
              {/* </Link> */}
              {/* <Menu.Item color="red">Delete</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const modalData = displayedTrips
    .filter((element) => element.status === 'ACTIVE')
    .map((element, index) => (
      <Table.Tr key={element._id}>
        <Table.Td>{element.tripId}</Table.Td>
        <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{element.vehicle?.number}</Table.Td>
        <Table.Td>{element.driver?.name}</Table.Td>
        <Table.Td>{element.supplierOrder?.supplierOrderRequest?.order?.length || '-'}</Table.Td>
        <Table.Td>
          {element.supplierOrder?.supplierOrderRequest?.order.reduce(
            (total: any, item: any) => total + item.quantity,
            0
          )}
        </Table.Td>
        <Table.Td style={{ textTransform: 'capitalize' }}>{element.purpose}</Table.Td>
        <Table.Td>
          <Button size="xs" onClick={() => handleSelect(element)}>
            Select
          </Button>
        </Table.Td>
      </Table.Tr>
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
            data={['Driver', 'Trip ID']}
            defaultValue="Trip ID"
            onChange={setModalSearchSegment}
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Search"
            onChange={(event) => setModalSearchTerm(event.currentTarget.value)}
            rightSection={<IconSearch size="20" color="gray" />}
          />
        </div>
        <div>
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Trip ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Vehicle</Table.Th>
                <Table.Th>Driver</Table.Th>
                <Table.Th>Products</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Purpose</Table.Th>
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
            total={Math.ceil(filteredTrips.length / tripsPerPage)}
            value={activeModalPage}
            onChange={handleModalPageChange}
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
              <Text style={{ fontWeight: 'bold' }}>Expenses</Text>
            </div>
            {/* <Link to="/admin/expenses/add-edit"> */}
            {hasPrivilege('ADD_EXPENSES') && (
              <Button size="sm" onClick={open}>
                Add Expenses
              </Button>
            )}
            {/* </Link> */}
          </div>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Trip ID']}
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
              <Table.Tr>
                <Table.Th>Trip ID</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Vehicle Number</Table.Th>
                <Table.Th>Driver</Table.Th>
                <Table.Th>Purpose</Table.Th>
                <Table.Th>Total Amount</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
              <Table.Tbody>
                {tds.length > 0 ? (
                  tds
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
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Expenses;
