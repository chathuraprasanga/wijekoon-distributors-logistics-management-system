import { RootState } from '@/redux/store';
import { Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewCustomerPayments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPayment = useSelector((state: RootState) => state.customers.customerPayment);

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

  const customer = selectedPayment?.customerOrder?.customerOrderRequest?.customer;
  const order = selectedPayment?.customerOrder;
  const paymentRow = selectedPayment?.paymentDetails;

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                View Payment Details
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
                <Table.Td width="35%">{customer.fullName}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width="35%">
                  {customer?.phone} | {customer?.phoneSecondary}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Email ID:
                </Table.Td>
                <Table.Td width="35%">{customer?.email}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td width="35%">{customer?.address}</Table.Td>
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
                <Table.Td width="35%">{order?.createdAt?.split('T')[0]}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Total Payment:
                </Table.Td>
                <Table.Td width="35%">{order?.netTotal?.toFixed(2)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Order ID:
                </Table.Td>
                <Table.Td width="35%">{order.orderId}</Table.Td>
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
                <Table.Td width="35%">
                  {parseFloat(selectedPayment.outstanding).toFixed(2)}
                </Table.Td>
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
                <Table.Th>Tax</Table.Th>
                <Table.Th>Line Total</Table.Th>
              </Table.Tr>
              {selectedPayment?.customerOrder?.customerOrderRequest?.order?.map(
                (item: any, index: any) => (
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
                )
              )}
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
                      {item.method === 'Cheque' ? item.depositDate.split('T')[0] : 'N/A'}
                    </Table.Td>
                    <Table.Td>{item.amount}</Table.Td>
                  </Table.Tr>
                </React.Fragment>
              ))}
              <Table.Tr>
                <Table.Td colSpan={4}>
                  {selectedPayment.outstanding > 0 && (
                    <Button size="xs">New Payment Details</Button>
                  )}
                </Table.Td>
                <Table.Td>Outstanding</Table.Td>
                <Table.Td>{selectedPayment.outstanding}</Table.Td>
              </Table.Tr>
            </Table>
            <div>
              {/* <Button style={{ width: '15%', marginTop: 10, float: 'right' }}>Update</Button> */}
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCustomerPayments;
