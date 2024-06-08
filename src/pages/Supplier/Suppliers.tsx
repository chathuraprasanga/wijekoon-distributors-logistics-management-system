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
  rem,
  Group,
  Modal,
} from '@mantine/core';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import {
  deleteSupplier,
  fetchProducts,
  fetchSupplierOrderRequests,
  fetchSupplierOrders,
  fetchSupplierPayments,
  fetchSuppliers,
  setSupplier,
} from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';

function Suppliers() {
  const [opened, setOpened] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector((state: RootState) => state.suppliers.suppliers);
  const status = useSelector((state: RootState) => state.suppliers.status);

  // for pagination
  const [activePage, setPage] = useState(1);
  const suppliersPerPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Email');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchSupplierOrderRequests());
    dispatch(fetchSupplierOrders());
    dispatch(fetchSupplierPayments());
    dispatch(fetchProducts());
  }, [dispatch]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * suppliersPerPage;
  const end = start + suppliersPerPage;

  // filtering Suppliers based on search
  const filteredSupplier = suppliers.filter((supplier: any) => {
    const value =
      searchSegment === 'Name'
        ? supplier.name
        : searchSegment === 'Phone'
          ? supplier.phone
          : supplier.email;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleViewEdit = (supplier: any, action: any) => {
    if (action === 'delete') {
      setSupplierToDelete(supplier);
      setOpened(true);
    } else {
      dispatch(setSupplier(supplier));
      if (action === 'view') {
        navigate('/admin/suppliers/view');
      } else if (action === 'edit') {
        navigate('/admin/suppliers/add-edit');
      }
    }
  };

  const handleAddSupplierBtn = () => {
    dispatch(setSupplier(null));
    navigate('/admin/suppliers/add-edit');
  };

  const handleDeleteSupplier = async (SupplierId: string) => {
    try {
      await dispatch(deleteSupplier(SupplierId)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier Deleted Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      setOpened(false);
      dispatch(fetchSuppliers());
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error deleting the Supplier',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const displayedSuppliers = filteredSupplier.slice(start, end);

  const rows = displayedSuppliers.map((supplier: any, index: any) => (
    <Table.Tr key={supplier._id}>
      <Table.Td>{start + index + 1}</Table.Td>
      <Table.Td>{supplier.name}</Table.Td>
      <Table.Td>{supplier.phone}</Table.Td>
      <Table.Td>{supplier.email}</Table.Td>
      <Table.Td>{supplier.address}</Table.Td>
      <Table.Td>
        <Badge color={supplier.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
          {supplier.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => handleViewEdit(supplier, 'view')}>View</Menu.Item>
            <Menu.Item onClick={() => handleViewEdit(supplier, 'edit')}>Edit</Menu.Item>
            <Menu.Item onClick={() => handleViewEdit(supplier, 'delete')} color="red">
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>#</Table.Th>
      <Table.Th>Supplier name</Table.Th>
      <Table.Th>Phone</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Address</Table.Th>
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
              <Text style={{ fontWeight: 'bold' }}>Suppliers</Text>
            </div>
            <Button size="sm" onClick={handleAddSupplierBtn}>
              Create Supplier
            </Button>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Name', 'Phone', 'Email']}
                defaultValue="Email"
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
              total={Math.ceil(suppliers.length / suppliersPerPage)}
              value={activePage}
              onChange={setPage}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the supplier {supplierToDelete?.name}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDeleteSupplier(supplierToDelete._id)}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Suppliers;
