import { fetchCheques, setCheque } from '@/redux/slices/chequesSlice';
import { RootState } from '@/redux/store';
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  Pagination,
  SegmentedControl,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Cheques() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.cheques.status);
  const error = useSelector((state: RootState) => state.cheques.error);
  const cheques = useSelector((state: RootState) => state.cheques.cheques);
  console.log(cheques);

  useEffect(() => {
    dispatch(fetchCheques());
  }, [dispatch]);

  // for pagination
  const [activePage, setPage] = useState(1);
  const chequesperPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Customer');
  const [searchTerm, setSearchTerm] = useState('');

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * chequesperPage;
  const end = start + chequesperPage;

  const filteredCheques = cheques.filter((cheque: any) => {
    const value =
      searchSegment === 'Cheque Number' ? cheque.chequeNumber : cheque.customer.fullName;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedCheques = filteredCheques.slice(start, end);

  const handleViewEdit = (data: any) => {
    dispatch(setCheque(data));
    navigate('/admin/cheques/view');
  };

  const tds = displayedCheques.map((item: any, index: any) => (
    <>
      <Table.Tr key={item._id}>
        <Table.Td>{item?.chequeNumber}</Table.Td>
        <Table.Td>{item?.customer?.fullName}</Table.Td>
        <Table.Td>{item?.bank}</Table.Td>
        <Table.Td>{item?.branch}</Table.Td>
        <Table.Td>{item?.amount}</Table.Td>
        <Table.Td>{item?.depositDate?.split('T')[0]}</Table.Td>
        <Table.Td>
          <Badge
            color={(() => {
              switch (item.status) {
                case 'PENDING':
                  return 'yellow';
                case 'DEPOSITED':
                  return 'green';
                case 'ACCEPTED':
                  return 'blue';
                case 'REJECTED':
                  return 'red';
                case 'RETURNED':
                  return 'violet';
                default:
                  return 'gray';
              }
            })()}
            radius="sm"
            size="xs"
          >
            {item?.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Link to="/admin/cheques/view" style={{ textDecoration: 'none' }}> */}
              <Menu.Item onClick={() => handleViewEdit(item)}>View</Menu.Item>
              {/* </Link> */}
              {/* <Link to="/admin/cheques/add-edit" style={{ textDecoration: 'none' }}>
                <Menu.Item>Edit</Menu.Item>
              </Link>
              <Menu.Item color="red">Delete</Menu.Item> */}
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
              <Text style={{ fontWeight: 'bold' }}>Cheque Database</Text>
            </div>
            {/* <Button size="sm" onClick={open}>
              Create Trip
            </Button> */}
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
                data={['Cheque Number', 'Customer']}
                defaultValue="Customer"
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
            <Table mt={10} striped highlightOnHover>
              <Table.Tr>
                <Table.Th>Cheque Number</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Bank</Table.Th>
                <Table.Th>Branch</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Deposit Date</Table.Th>
                <Table.Th>Status</Table.Th>
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
            <Pagination
              total={Math.ceil(filteredCheques.length / chequesperPage)}
              value={activePage}
              onChange={handlePageChange}
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

export default Cheques;
