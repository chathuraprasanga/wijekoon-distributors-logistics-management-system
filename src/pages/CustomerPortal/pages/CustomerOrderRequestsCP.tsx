import React, { useEffect, useState } from 'react';
import { Badge, Divider, Input, Menu, Modal, Pagination, Table, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchCustomerOrderRequestsById } from '@/redux/slices/customerPortalSlice';

function CustomerOrderRequestsCP() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const requestsPerPage = 10;
  const orderRequest = useSelector(
    (state: RootState) => state.customerPortal.customerOrderRequests
  );
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer?._id) {
      dispatch(fetchCustomerOrderRequestsById(customer._id));
    }
  }, [dispatch, customer?._id]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * requestsPerPage;
  const end = start + requestsPerPage;

  // filtering customers based on search
  const filteredRequest = orderRequest.filter((request: any) => {
    const value = request.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedRequest = filteredRequest.slice(start, end);

  const handleViewClick = (request: any) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const rows = displayedRequest.map((element: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.orderId}</Table.Td>
      <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
      <Table.Td>{element.order.length}</Table.Td>
      <Table.Td>{element.order.reduce((total, item) => total + item.quantity, 0)}</Table.Td>
      <Table.Td>{element.expectedDate.split('T')[0]}</Table.Td>
      <Table.Td>
        <Badge
          color={(() => {
            switch (element?.status) {
              case 'PENDING':
                return 'yellow';
              case 'CONFIRMED':
                return 'green';
              case 'COMPLETED':
                return 'blue';
              case 'CANCELLED':
                return 'red';
              default:
                return 'gray';
            }
          })()}
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
            <Menu.Item onClick={() => handleViewClick(element)}>View</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text fw={'bold'}>Customer Order Requests</Text>
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
            <Table.Th>Expected Date</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
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
        <Divider />
        <Pagination
          total={Math.ceil(filteredRequest.length / requestsPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </div>

      <Modal
        size="60%"
        opened={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Order Request Details"
      >
        {selectedRequest && (
          <div>
            <Text>
              <strong>Order ID:</strong> {selectedRequest.orderId}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedRequest.createdAt.split('T')[0]}
            </Text>
            <Text>
              <strong>Products:</strong> {selectedRequest.order.length}
            </Text>
            <Text>
              <strong>Quantity:</strong>{' '}
              {selectedRequest.order.reduce((total: any, item: any) => total + item.quantity, 0)}
            </Text>
            <Text>
              <strong>Expected Date:</strong> {selectedRequest.expectedDate.split('T')[0]}
            </Text>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge
                color={(() => {
                  switch (selectedRequest?.status) {
                    case 'PENDING':
                      return 'yellow';
                    case 'CONFIRMED':
                      return 'green';
                    case 'COMPLETED':
                      return 'blue';
                    case 'CANCELLED':
                      return 'red';
                    default:
                      return 'gray';
                  }
                })()}
                radius="xs"
                size="xs"
              >
                {selectedRequest.status}
              </Badge>
            </Text>
            <Divider my="sm" />
            <Text>
              <strong>Order Items:</strong>
            </Text>
            <Table>
              <Table.Thead>
                <Table.Th>Product</Table.Th>
                <Table.Th>Size</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>quantity</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Thead>
              <Table.Tbody>
                {selectedRequest.order.map((item: any, index: number) => (
                  <Table.Tr key={item._id}>
                    <Table.Td>{item.product.name}</Table.Td>
                    <Table.Td>{item.product.size}</Table.Td>
                    <Table.Td>{item.product.sellingPrice}</Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>LKR {item.lineTotal.toFixed(2)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <Divider />
            <Text>
              <strong>Total Amount:</strong> LKR {selectedRequest.netTotal.toFixed(2) || 0.0}
            </Text>
          </div>
        )}
      </Modal>
    </>
  );
}

export default CustomerOrderRequestsCP;
