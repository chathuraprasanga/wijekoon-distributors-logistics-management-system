import React, { useEffect, useState } from 'react';
import { Badge, Divider, Input, Menu, Modal, Pagination, Table, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  fetchCustomerOrderRequestsById,
  fetchCustomerOrdersById,
} from '@/redux/slices/customerPortalSlice';

function CustomerOrdersCP() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const ordersPerPage = 10;
  const orders = useSelector((state: RootState) => state.customerPortal.customerOrders);
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelecteOrder] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer?._id) {
      dispatch(fetchCustomerOrdersById(customer._id));
    }
  }, [dispatch, customer?._id]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * ordersPerPage;
  const end = start + ordersPerPage;

  // filtering customers based on search
  const filteredOrders = orders.filter((order: any) => {
    const value = order?.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedOrders = filteredOrders.slice(start, end);

  const handleViewClick = (request: any) => {
    setSelecteOrder(request);
    setModalOpen(true);
  };

  const rows = displayedOrders.map((element: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element?.orderId}</Table.Td>
      <Table.Td>{element?.createdAt.split('T')[0]}</Table.Td>
      <Table.Td>{element?.customerOrderRequest?.order?.length}</Table.Td>
      <Table.Td>
        {element?.customerOrderRequest?.order?.reduce((total, item) => total + item.quantity, 0)}
      </Table.Td>
      <Table.Td>{element?.netTotal.toFixed(2)}</Table.Td>
      <Table.Td>
        <Badge
          color={(() => {
            switch (element?.status) {
              case 'PAID':
                return 'green';
              case 'NOT PAID':
                return 'red';
              default:
                return 'gray';
            }
          })()}
          radius="xs"
          size="xs"
        >
          {element?.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => handleViewClick(element)}>View</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text fw={'bold'}>Customer Orders</Text>
        <Input
          size="xs"
          placeholder="Search by Id"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </div>

      <hr />
      <div>
        <Table striped highlightOnHover>
          <Table.Tr>
            <Table.Th>Order Id</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Products</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
          <Table.Tbody>
            {rows?.length > 0 ? (
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
        <Divider />
        <Pagination
          total={Math.ceil(filteredOrders.length / ordersPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </div>

      <Modal
        opened={isModalOpen}
        size="60%"
        onClose={() => setModalOpen(false)}
        title="Order Request Details"
      >
        {selectedOrder && (
          <div>
            <Text>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedOrder.createdAt.split('T')[0]}
            </Text>
            <Text>
              <strong>Products:</strong> {selectedOrder.customerOrderRequest.order?.length}
            </Text>
            <Text>
              <strong>Quantity:</strong>{' '}
              {selectedOrder.customerOrderRequest.order.reduce(
                (total: any, item: any) => total + item.quantity,
                0
              )}
            </Text>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge
                color={(() => {
                  switch (selectedOrder?.status) {
                    case 'PAID':
                      return 'green';
                    case 'NOT PAID':
                      return 'red';
                    default:
                      return 'gray';
                  }
                })()}
                radius="xs"
                size="xs"
              >
                {selectedOrder.status}
              </Badge>
            </Text>
            <Divider my="sm" />
            <Text>
              <strong>Order Items:</strong>
            </Text>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Size</Table.Th>
                  <Table.Th>Unit Price</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Discount</Table.Th>
                  <Table.Th>Tax</Table.Th>
                  <Table.Th>Line Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {selectedOrder.customerOrderRequest.order.map((item: any, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td>{item.product.name}</Table.Td>
                    <Table.Td>{item.product.size} KG</Table.Td>
                    <Table.Td>{item.product.sellingPrice.toFixed(2)}</Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>{`${item.discount || 0}%`}</Table.Td>
                    <Table.Td>{`${item.tax || 0}%`}</Table.Td>
                    <Table.Td>{item.lineTotal.toFixed(2)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Text mt={'md'}>
              <strong>Total Amount:</strong> LKR {selectedOrder.netTotal.toFixed(2) || 0.0}
            </Text>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CustomerOrdersCP;
