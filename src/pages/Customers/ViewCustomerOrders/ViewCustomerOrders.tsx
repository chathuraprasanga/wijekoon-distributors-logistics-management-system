import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

function ViewCustomerOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedOrder = useSelector((state: RootState) => state.customers.customerOrder);

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

  const customer = selectedOrder?.customerOrderRequest?.customer;
  const order = selectedOrder?.customerOrderRequest?.order;

  const handleGoToPayments = () => {
    // dispatch(fetchCustomerPayments)
    navigate('/admin/customers/payments');
  };

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
                View Customer Order
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
                <Table.Td width="35%">{customer?.fullName}</Table.Td>
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
                <Table.Td width="35%">{selectedOrder?.createdAt?.split('T')[0]}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Total Payment:
                </Table.Td>
                <Table.Td width="35%">{selectedOrder?.netTotal.toFixed(2)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Order ID:
                </Table.Td>
                <Table.Td width="35%">{selectedOrder?.orderId}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Status:
                </Table.Td>
                <Table.Td width="35%">
                  <Badge
                    size="xs"
                    radius="sm"
                    color={selectedOrder?.status === 'PAID' ? 'green' : 'red'}
                  >
                    {selectedOrder?.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
              {/* <Table.Tr>
                <Table.Td width="15%"></Table.Td>
                <Table.Td width="35%"></Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Outstanding:
                </Table.Td>
                <Table.Td width="35%">50000.00</Table.Td>
              </Table.Tr> */}
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
              {order.map((item: any, index: any) => (
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
              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Grand Total:</Table.Td>
                <Table.Td>{selectedOrder?.netTotal.toFixed(2)}</Table.Td>
              </Table.Tr>
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Tax:</Table.Td>
                <Table.Td>5000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Discount: </Table.Td>
                <Table.Td>30000.00</Table.Td>
              </Table.Tr> */}
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>30000.00</Table.Td>
                <Table.Td>125000.00</Table.Td>
              </Table.Tr> */}
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>
            {/* <Link to="/admin/customers/add-payments"> */}
            <Button
              style={{ width: '15%', marginTop: 10, float: 'right' }}
              onClick={handleGoToPayments}
            >
              Go To Payments
            </Button>
            {/* </Link> */}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCustomerOrders;
