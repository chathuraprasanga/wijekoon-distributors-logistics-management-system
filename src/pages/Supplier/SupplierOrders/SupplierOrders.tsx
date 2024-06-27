import {
  fetchConfirmedSupplierOrderRequests,
  fetchSupplierOrders,
  setSupplierOrder,
  setSupplierOrderRequest,
} from '@/redux/slices/supplierSlice';

import {
  Grid,
  Button,
  Card,
  Table,
  Pagination,
  Text,
  Badge,
  Menu,
  Modal,
  TextInput,
  SegmentedControl,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDots, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function SupplierOrders() {
  const [activeModelPage, setModelPage] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.suppliers.status);
  const error = useSelector((state: RootState) => state.suppliers.error);
  const orders = useSelector((state: RootState) => state.suppliers.supplierOrders);
  const orderRequests = useSelector((state: RootState) => state.suppliers.supplierOrderRequests);

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
    dispatch(fetchSupplierOrders());
    dispatch(fetchConfirmedSupplierOrderRequests());
  }, [dispatch]);

  // for search
  const [searchSegment, setSearchSegment] = useState('Supplier');
  const [searchTerm, setSearchTerm] = useState('');

  // for pagination
  const [activePage, setPage] = useState(1);
  const ordersPerPage = 10;
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * ordersPerPage;
  const end = start + ordersPerPage;

  const filteredOrders = orders.filter((order: any) => {
    const value =
      searchSegment === 'Supplier'
        ? order.supplierOrderRequest?.supplier?.name
        : order.supplierOrderRequest?.orderId;
    return value?.toLowerCase().includes(searchTerm?.toLowerCase());
  });

  const displayedOrders = filteredOrders.slice(start, end);

  const handleView = (data: any) => {
    dispatch(setSupplierOrder(data));
    navigate('/admin/suppliers/view-orders');
  };

  // pagination for modal
  const [activeModalPage, setModalPage] = useState(1);
  const requestPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * requestPerPage;
  const endModal = startModal + requestPerPage;

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Supplier');
  const [modalSearchTerm, setModalSearchTerm] = useState('');

  const filteredRequests = orderRequests.filter((request: any) => {
    const value =
      modalSearchSegment === 'Supplier' && request.customer
        ? request?.supplier.name
        : request?.orderId;
    return value && value?.toLowerCase().includes(modalSearchTerm?.toLowerCase());
  });

  const displaedRequests = filteredRequests.slice(startModal, endModal);

  const handleSelect = (element: any) => {
    dispatch(setSupplierOrderRequest(element));
    navigate('/admin/suppliers/add-orders');
  };

  const rows = displayedOrders.map((element: any, index: any) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td width="10%">{element?.supplierOrderRequest?.orderId}</Table.Td>
        <Table.Td width="10%">{element?.createdAt?.split('T')[0]}</Table.Td>
        <Table.Td width="20%">{element?.supplierOrderRequest?.supplier?.name}</Table.Td>

        <Table.Td width="5%">{element?.supplierOrderRequest?.order.length}</Table.Td>
        <Table.Td width="5%">{element?.supplierOrderRequest?.totalQuantity}</Table.Td>
        <Table.Td width="10%">{element?.supplierOrderRequest?.netTotal.toFixed(2)}</Table.Td>
        <Table.Td width="10%">{element?.supplierOrderRequest?.totalSize} KG</Table.Td>
        <Table.Td width="15%" style={{ textTransform: 'capitalize' }}>
          {element?.supplierOrderRequest?.purpose}
        </Table.Td>
        <Table.Td width="10%">
          <Badge color={element.status === 'PAID' ? 'green' : 'red'} radius="xs" size="xs">
            {element.status}
          </Badge>
        </Table.Td>
        <Table.Td width="10%">
          <Menu shadow="md" width={100}>
            <Menu.Target>
              <IconDots style={{ cursor: 'pointer' }} />
            </Menu.Target>

            <Menu.Dropdown>
              {/* <Link to="/admin/suppliers/view-orders" style={{ textDecoration: 'none' }}> */}
              {hasPrivilege('VIEW_SUPPLIER_ORDERS') && (
                <Menu.Item onClick={() => handleView(element)}>View</Menu.Item>
              )}
              {/* </Link> */}
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Order ID</Table.Th>
      <Table.Th>Date </Table.Th>
      <Table.Th>Supplier</Table.Th>
      <Table.Th>Products</Table.Th>
      <Table.Th>Qty</Table.Th>
      <Table.Th>Amount</Table.Th>
      <Table.Th>Size</Table.Th>
      <Table.Th>Purpose</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  const modalData = displaedRequests.map((element, index) => (
    <>
      <Table.Tr key={element._id}>
        <Table.Td>{element?.orderId}</Table.Td>
        <Table.Td>{element?.createdAt?.split('T')[0]}</Table.Td>
        <Table.Td>{element?.supplier?.name}</Table.Td>
        <Table.Td>{element?.order?.length}</Table.Td>
        <Table.Td>{element?.totalQuantity}</Table.Td>
        <Table.Td>{element?.netTotal}</Table.Td>

        <Table.Td style={{ textTransform: 'capitalize' }}>{element.purpose}</Table.Td>
        <Table.Td>
          {/* <Link to="/admin/suppliers/add-orders"> */}
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
      <Modal opened={opened} onClose={close} withCloseButton={false} size="70%">
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Supplier Order Request to Create Supplier Order
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
          <Table striped highlightOnHover>
            <Table.Thead>
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
            total={Math.ceil(filteredRequests.length / requestPerPage)}
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
              <Text style={{ fontWeight: 'bold' }}>Supplier Order </Text>
            </div>
            {hasPrivilege('ADD_SUPPLIER_ORDERS') && (
              <Button size="sm" onClick={open}>
                Create Supplier Order
              </Button>
            )}
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Order ID', 'Supplier']}
                defaultValue="Supplier"
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
              total={Math.ceil(filteredOrders.length / ordersPerPage)}
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

export default SupplierOrders;
