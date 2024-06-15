import { fetchExpenses, setExpense } from '@/redux/slices/tripsSlice';
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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Expenses() {
  const [activePage, setPage] = useState(1);
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.trips.status);
  const expenses = useSelector((state: RootState) => state.trips.expenses);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

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

  const tds = displayedExpenses.map((data) => (
    <>
      <Table.Tr key={data._id}>
        <Table.Td>{data.tripId.tripId}</Table.Td>
        <Table.Td>{data.tripId.createdAt.split('T')[0]}</Table.Td>
        <Table.Td>{data?.tripId?.vehicle?.number || 'N/A'}</Table.Td>
        <Table.Td>{data?.tripId?.driver.name}</Table.Td>
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
              <Menu.Item onClick={() => handleView(data)}>View</Menu.Item>
              {/* </Link> */}
              {/* <Link to="/admin/expenses/add-edit" style={{ textDecoration: 'none' }}> */}
              <Menu.Item onClick={() => handleEdit(data)}>Edit</Menu.Item>
              {/* </Link> */}
              {/* <Menu.Item color="red">Delete</Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Expenses</Text>
            </div>
            <Link to="/admin/expenses/add-edit">
              <Button size="sm">Add Expenses</Button>
            </Link>
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
