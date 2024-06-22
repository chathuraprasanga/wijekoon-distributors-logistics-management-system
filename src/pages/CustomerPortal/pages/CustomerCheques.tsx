import React, { useEffect, useState } from 'react';
import { Badge, Divider, Input, Menu, Modal, Pagination, Table, Text } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  fetchCustomerChequesByCustomerId,
  fetchCustomerOrderRequestsById,
} from '@/redux/slices/customerPortalSlice';

function CustomerCheques() {
  const dispatch = useDispatch();
  const [activePage, setPage] = useState(1);
  const chequesPerPage = 10;
  const cheques = useSelector((state: RootState) => state.customerPortal.customerCheques);
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCheque, setSelectedCheque] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (customer?._id) {
      dispatch(fetchCustomerChequesByCustomerId(customer._id));
    }
  }, [dispatch, customer?._id]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * chequesPerPage;
  const end = start + chequesPerPage;

  // filtering customers based on search
  const filteredCheques = cheques.filter((cheque: any) => {
    const value = cheque.order.orderId;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedCheques = filteredCheques.slice(start, end);

  const handleViewClick = (request: any) => {
    setSelectedCheque(request);
    setModalOpen(true);
  };

  const rows = displayedCheques.map((element: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{element.order.orderId}</Table.Td>
      <Table.Td>{element.createdAt.split('T')[0]}</Table.Td>
      <Table.Td>{element.bank}</Table.Td>
      <Table.Td>{element.branch}</Table.Td>
      <Table.Td>{element.chequeNumber}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
      <Table.Td>{element.depositDate.split('T')[0]}</Table.Td>
      <Table.Td>
        <Badge
          color={(() => {
            switch (element.status) {
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
        <Text fw={'bold'}>Customer Cheques</Text>
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
            <Table.Th>Bank</Table.Th>
            <Table.Th>Branch</Table.Th>
            <Table.Th>Cheque Number</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>DepositDate</Table.Th>
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
          total={Math.ceil(filteredCheques.length / chequesPerPage)}
          value={activePage}
          onChange={handlePageChange}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </div>

      <Modal opened={isModalOpen} onClose={() => setModalOpen(false)} title="Cheque Details">
        {selectedCheque && (
          <div>
            <Text>
              <strong>Order ID:</strong> {selectedCheque.order.orderId}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedCheque.createdAt.split('T')[0]}
            </Text>
            <Text>
              <strong>Bank:</strong> {selectedCheque.bank}
            </Text>
            <Text>
              <strong>Branch:</strong> {selectedCheque.branch}
            </Text>
            <Text>
              <strong>Cheque Number:</strong> {selectedCheque.chequeNumber}
            </Text>
            <Text>
              <strong>Amount:</strong> LKR {selectedCheque.amount.toFixed(2)}
            </Text>
            <Text>
              <strong>Deposit Date:</strong> {selectedCheque.depositDate.split('T')[0]}
            </Text>
            <Text>
              <strong>Status:</strong>{' '}
              <Badge
                color={(() => {
                  switch (selectedCheque.status) {
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
                radius="xs"
                size="xs"
              >
                {selectedCheque.status}
              </Badge>
            </Text>
          </div>
        )}
        <hr />
      </Modal>
    </>
  );
}

export default CustomerCheques;
