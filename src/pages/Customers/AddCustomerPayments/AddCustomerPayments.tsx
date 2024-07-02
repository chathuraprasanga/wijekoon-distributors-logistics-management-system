import { Button, Card, Grid, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/redux/store';
import CustomerPaymentUpdateModal from './customerPaymentUpdate/customerPaymentUpdateModal';

function AddCustomerPayments() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const selectedPayment = useSelector((state: RootState) => state.customers.customerPayment);
  const selectedOrder = selectedPayment?.customerOrder;
  // const paymentDetails = selectedPayment?.paymentDetails;
  const [opened, { open, close }] = useDisclosure(false);

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

  return (
    <>
      <CustomerPaymentUpdateModal
        opened={opened}
        onClose={close}
        customerOrder={selectedOrder}
        totalPayable={selectedPayment?.totalPayable}
      />

      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Make Payment
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Customer Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width="35%">
                  {selectedOrder?.customerOrderRequest?.customer?.fullName}
                </Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width="35%">
                  {selectedOrder?.customerOrderRequest?.customer?.phone} |{' '}
                  {selectedOrder?.customerOrderRequest?.customer?.phoneSecondary}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Email ID:
                </Table.Td>
                <Table.Td width="35%">
                  {selectedOrder?.customerOrderRequest?.customer?.email}
                </Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td width="35%">
                  {selectedOrder?.customerOrderRequest?.customer?.address}
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Order Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Date:
                </Table.Td>
                <Table.Td width="35%">{selectedOrder?.createdAt?.split('T')[0]}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Total Payment:
                </Table.Td>
                <Table.Td width="35%">{selectedPayment?.totalPayable?.toFixed(2)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Order ID:
                </Table.Td>
                <Table.Td width="35%">{selectedOrder?.orderId}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Paid Amount:
                </Table.Td>
                <Table.Td width="35%">
                  {(
                    parseFloat(selectedPayment?.totalPayable) -
                    parseFloat(selectedPayment?.outstanding)
                  ).toFixed(2)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%"></Table.Td>
                <Table.Td width="35%"></Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Outstanding:
                </Table.Td>
                <Table.Td width="35%">{selectedPayment?.outstanding?.toFixed(2)}</Table.Td>
              </Table.Tr>
            </Table>
            <Table
              withColumnBorders
              withRowBorders
              withTableBorder
              mt={10}
              style={{ fontSize: 12 }}
            >
              <Table.Tr>
                <Table.Th>Product Code</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Discount</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Line Total</Table.Th>
              </Table.Tr>
              {selectedPayment?.customerOrder?.customerOrderRequest?.order?.map(
                (item: any, index: any) => (
                  <React.Fragment key={index}>
                    <Table.Tr>
                      <Table.Td>{item.product.code}</Table.Td>
                      <Table.Td>{item.product.name}</Table.Td>
                      <Table.Td>{item.product.size} KG</Table.Td>
                      <Table.Td>{item.product.sellingPrice?.toFixed(2)}</Table.Td>
                      <Table.Td>{item.quantity}</Table.Td>
                      <Table.Td>{item.lineDiscount}%</Table.Td>
                      <Table.Td>{item.lineTax}%</Table.Td>
                      <Table.Td>{item.lineTotal?.toFixed(2)}</Table.Td>
                    </Table.Tr>
                  </React.Fragment>
                )
              )}
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Sub Total:</Table.Td>
                <Table.Td>120000.00</Table.Td>
              </Table.Tr> */}
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Tax:</Table.Td>
                <Table.Td>5000.00</Table.Td>
              </Table.Tr> */}
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Discount: </Table.Td>
                <Table.Td>30000.00</Table.Td>
              </Table.Tr> */}
              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Grand Total</Table.Td>
                <Table.Td>{selectedOrder?.netTotal?.toFixed(2)}</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Payment Details</Text>
            <Table
              withColumnBorders
              withRowBorders
              withTableBorder
              mt={10}
              style={{ fontSize: 12 }}
            >
              <Table.Tr>
                <Table.Th>Payment Method</Table.Th>
                <Table.Th>Bank</Table.Th>
                <Table.Th>Branch</Table.Th>
                <Table.Th>Chequ no.</Table.Th>
                <Table.Th>Deposite Date</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
              {selectedPayment?.paymentDetails?.map((item: any, index: any) => (
                <React.Fragment key={index}>
                  <Table.Tr>
                    <Table.Td>{item.method}</Table.Td>
                    <Table.Td>{item.bank || 'N/A'}</Table.Td>
                    <Table.Td>{item.branch || 'N/A'}</Table.Td>
                    <Table.Td>{item.chequeNumber || 'N/A'}</Table.Td>
                    <Table.Td>
                      {item.method === 'Cheque' ? item.depositDate?.split('T')[0] : 'N/A'}
                    </Table.Td>
                    <Table.Td>{item.amount}</Table.Td>
                  </Table.Tr>
                </React.Fragment>
              ))}
              <Table.Tr>
                <Table.Td colSpan={4}>
                  {/* <Button size="xs">New Payment Details</Button> */}
                </Table.Td>
                <Table.Td>Outstanding</Table.Td>
                <Table.Td>{selectedPayment?.outstanding?.toFixed(2)}</Table.Td>
              </Table.Tr>
            </Table>
            <div>
              <Button
                style={{ width: '15%', marginTop: 10, float: 'right' }}
                onClick={() => open()}
              >
                New Payment
              </Button>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddCustomerPayments;
