import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ModalsProvider, modals } from '@mantine/modals';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setCustomerOrderRequest, setCustomerPayment } from '@/redux/slices/customerSlice';

function ViewCustomerOrderRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedRequest = useSelector((state: RootState) => state.customers.customerOrderRequest);
  console.log(selectedRequest);

  const openCancelRequest = () =>
    modals.openConfirmModal({
      title: 'Cancel Order Request',
      children: <Text size="sm">Please confirm to cancel this customer order request</Text>,
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
    });

  const handleCreateOrder = () => {
    dispatch(setCustomerOrderRequest(selectedRequest));
    dispatch(setCustomerPayment(null));
    navigate('/admin/customers/add-orders');
  };

  return (
    <>
      <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
        <Grid>
          <Grid.Col span={12}>
            <div>
              <div style={{ display: 'flex' }}>
                <Link to={-1}>
                  <IconArrowLeft />
                </Link>
                <Text size="md" style={{ fontWeight: 'bold' }}>
                  View Customer Order Requests
                </Text>
              </div>
              <div></div>
            </div>
          </Grid.Col>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" style={{ fontWeight: 'bold' }}>
                Customer Details
              </Text>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Name:
                  </Table.Td>
                  <Table.Td width="35%">{selectedRequest.customer.fullName}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Created Date:
                  </Table.Td>
                  <Table.Td width="35%">
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td width="35%">
                    {selectedRequest.customer.phone} | {selectedRequest.customer.phoneSecondary}
                  </Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Created By:
                  </Table.Td>
                  <Table.Td width="35%">N/A</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td width="35%">{selectedRequest.customer.email}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Expected Date:
                  </Table.Td>
                  <Table.Td width="35%">
                    {new Date(selectedRequest.expectedDate).toLocaleDateString()}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td width="35%">{selectedRequest.customer.address}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Status:
                  </Table.Td>
                  <Table.Td width="35%">
                    <Badge
                      size="sm"
                      radius="sm"
                      color={(() => {
                        switch (selectedRequest.status) {
                          case 'PENDING':
                            return 'yellow';
                          case 'CONFIRMED':
                            return 'green';
                          case 'CANCELLED':
                            return 'red';
                          case 'COMPLETED':
                            return 'blue';
                          case 'NOT COMPLETED':
                            return 'purple';
                          default:
                            return 'gray';
                        }
                      })()}
                    >
                      {selectedRequest.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>

          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table withColumnBorders withRowBorders withTableBorder>
                <Table.Tr>
                  <Table.Th>Product Code</Table.Th>
                  <Table.Th>Product Name</Table.Th>
                  <Table.Th>Product Size</Table.Th>
                  <Table.Th>Unit Price</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Discount</Table.Th>
                  <Table.Th>Tax</Table.Th>
                  <Table.Th>Line Total</Table.Th>
                </Table.Tr>
                {selectedRequest.order.map((item: any, index: any) => (
                  <React.Fragment key={index}>
                    <Table.Tr>
                      <Table.Td>{item.product.code}</Table.Td>
                      <Table.Td>{item.product.name}</Table.Td>
                      <Table.Td>{item.product.size} KG</Table.Td>
                      <Table.Td>{item.product.sellingPrice.toFixed(2)}</Table.Td>
                      <Table.Td>{item.quantity}</Table.Td>
                      <Table.Td>{item.lineDiscount}%</Table.Td>
                      <Table.Td>{item.lineTax}%</Table.Td>
                      <Table.Td>{item.lineTotal.toFixed(2)}</Table.Td>
                    </Table.Tr>
                  </React.Fragment>
                ))}
                {/* <Table.Tr> */}
                {/* <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>Sub Total:</Table.Td>
                  <Table.Td>${selectedRequest.subTotal}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>Tax:</Table.Td>
                  <Table.Td>${selectedRequest.totalTax}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>Discount:</Table.Td>
                  <Table.Td>${selectedRequest.totalDiscount}</Table.Td>
                </Table.Tr> */}
                <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>Grand Total:</Table.Td>
                  <Table.Td>{selectedRequest.netTotal.toFixed(2)}</Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col>
            {selectedRequest?.status === 'PENDING' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button color="red" onClick={openCancelRequest}>
                  Cancel Request
                </Button>
                <Button ml={10} color="violet">
                  Confirm Request
                </Button>
              </div>
            )}
            {selectedRequest?.status === 'CONFIRMED' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button ml={10} color="blue" onClick={handleCreateOrder}>
                  Create Order
                </Button>
              </div>
            )}
          </Grid.Col>
        </Grid>
      </ModalsProvider>
    </>
  );
}

export default ViewCustomerOrderRequests;
