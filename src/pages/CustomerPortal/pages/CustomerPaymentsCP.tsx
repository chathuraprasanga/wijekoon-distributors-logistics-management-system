import React, { useEffect, useState } from 'react';
import { Badge, Divider, Input, Menu, Modal, Pagination, Table, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchCustomerPaymentsById } from '@/redux/slices/customerPortalSlice';

function CustomerPaymentsCP() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const paymentsPerPage = 10;
  const payments = useSelector((state: RootState) => state.customerPortal.customerPayments);
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer?._id) {
      dispatch(fetchCustomerPaymentsById(customer._id));
    }
  }, [dispatch, customer?._id]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * paymentsPerPage;
  const end = start + paymentsPerPage;

  // filtering customers based on search
  const filteredPayments = payments.filter((payment: any) => {
    const value = payment.customerOrder.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedPayments = filteredPayments.slice(start, end);

  const handleViewClick = (request: any) => {
    setSelectedPayment(request);
    setModalOpen(true);
  };

  const rows = displayedPayments.map((element: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.customerOrder.orderId}</Table.Td>
      <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
      <Table.Td>{element.totalPayable}</Table.Td>
      <Table.Td>
        {element?.paymentDetails
          .reduce((sum: any, item: any) => (item.method === 'Cash' ? sum + item.amount : sum), 0)
          .toFixed(2)}
      </Table.Td>
      <Table.Td>
        {element?.paymentDetails
          .reduce((sum: any, item: any) => (item.method === 'Cheque' ? sum + item.amount : sum), 0)
          .toFixed(2)}
      </Table.Td>
      <Table.Td>{element.outstanding}</Table.Td>
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
        <Text fw={'bold'}>Customer Payments</Text>
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
            <Table.Th>Amount</Table.Th>
            <Table.Th>Cash</Table.Th>
            <Table.Th>Cheque</Table.Th>
            <Table.Th>Outstanding</Table.Th>
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
          total={Math.ceil(filteredPayments.length / paymentsPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </div>

      <Modal size="50%" opened={isModalOpen} onClose={() => setModalOpen(false)} title="Payment Details">
        {selectedPayment && (
          <div>
            <Text>
              <strong>Order ID:</strong> {selectedPayment.customerOrder.orderId}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedPayment.createdAt.split('T')[0]}
            </Text>
            <Text>
              <strong>Total Payable:</strong> LKR {selectedPayment.totalPayable.toFixed(2)}
            </Text>
            <Text>
              <strong>Total Cash Payment:</strong>{' '}
              {selectedPayment.paymentDetails
                .reduce(
                  (sum: any, item: any) => (item.method === 'Cash' ? sum + item.amount : sum),
                  0
                )
                .toFixed(2)}
            </Text>
            <Text>
              <strong>Total Cheque Payment:</strong>{' '}
              {selectedPayment.paymentDetails
                .reduce(
                  (sum: any, item: any) => (item.method === 'Cheque' ? sum + item.amount : sum),
                  0
                )
                .toFixed(2)}
            </Text>
            <Text>
              <strong>Outstanding Amount:</strong> LKR {selectedPayment.outstanding.toFixed(2)}
            </Text>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge
                color={(() => {
                  switch (selectedPayment?.status) {
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
                {selectedPayment.status}
              </Badge>
            </Text>
          </div>
        )}
        <hr />
        <div>
          <Table>
            <Table.Tr>
              <Table.Th>Method</Table.Th>
              <Table.Th>Bank</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Cheque number</Table.Th>
              <Table.Th>Deposite Date</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
            <Table.Tbody>
            {selectedPayment?.paymentDetails.map((item:any) => (
              <Table.Tr key={item._id}>
                <Table.Td>{item.method}</Table.Td>
                <Table.Td>{item.bank || 'N/A'}</Table.Td>
                <Table.Td>{item.branch || 'N/A'}</Table.Td>
                <Table.Td>{item.chequeNumber || 'N/A'}</Table.Td>
                <Table.Td>{item.depositDate.split('T')[0] || 'N/A'}</Table.Td>
                <Table.Td>{item.amount}</Table.Td>
              </Table.Tr>
            ))}
            </Table.Tbody>
          </Table>
        </div>
      </Modal>
    </>
  );
}

export default CustomerPaymentsCP;
