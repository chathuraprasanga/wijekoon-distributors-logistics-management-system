import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SupplierPaymentUpdateModal from './SupplierPaymentModal/SupplierPaymentModal';
import { RootState } from '@/redux/store';

function ViewSupplierPayments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.suppliers.status);
  const error = useSelector((state: RootState) => state.suppliers.error);
  const supplierPayment = useSelector((state: RootState) => state.suppliers.supplierPayment);
  console.log(supplierPayment);
  const [opened, { open, close }] = useDisclosure(false);

  const { supplier } = supplierPayment?.supplierOrder?.supplierOrderRequest;
  const order = supplierPayment.supplierOrder;
  const paymentDetails = supplierPayment.payments;

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
      <SupplierPaymentUpdateModal
        opened={opened}
        onClose={close}
        customerOrder={order}
        totalPayable={supplierPayment?.totalPayable}
      />
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
            <Text style={{ fontWeight: 'bold' }}>Supplier Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width="35%">{supplier?.name}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width="35%">
                  {supplier?.phone} | {supplier?.phoneSecondary}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Email ID:
                </Table.Td>
                <Table.Td width="35%">{supplier?.email}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td width="35%">{supplier?.address}</Table.Td>
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
                <Table.Td width="35%">{order?.createdAt.split('T')[0]}</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Total Payment:
                </Table.Td>
                <Table.Td width="35%">{supplierPayment?.totalPayable.toFixed(2)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Order ID:
                </Table.Td>
                <Table.Td width="35%">
                  {supplierPayment?.supplierOrder?.supplierOrderRequest?.orderId}
                </Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Outstanding:
                </Table.Td>
                <Table.Td width="35%">{supplierPayment?.outstanding?.toFixed(2)}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%"></Table.Td>
                <Table.Td width="35%"></Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Status:
                </Table.Td>
                <Table.Td width="35%">
                  <Badge
                    size="xs"
                    radius="xs"
                    color={supplierPayment?.status === 'PAID' ? 'green' : 'red'}
                  >
                    {supplierPayment?.status}
                  </Badge>
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
              {supplierPayment?.supplierOrder?.supplierOrderRequest?.order?.map((item, index) => (
                <Table.Tr key={item._id}>
                  <Table.Td>{item?.product?.code}</Table.Td>
                  <Table.Td>{item?.product?.name}</Table.Td>
                  <Table.Td>{item?.product?.size}</Table.Td>
                  <Table.Td>{item?.product?.buyingPrice}</Table.Td>
                  <Table.Td>{item?.quantity}</Table.Td>
                  <Table.Td>{item?.discount?.toFixed(2) || 0.0} %</Table.Td>
                  <Table.Td>{item?.tax?.toFixed(2) || 0.0} %</Table.Td>
                  <Table.Td>{item?.lineTotal?.toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}

              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Grand Total:</Table.Td>
                <Table.Td>
                  {supplierPayment?.supplierOrder?.supplierOrderRequest?.netTotal?.toFixed(2)}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Total Quantity:</Table.Td>
                <Table.Td>
                  {supplierPayment?.supplierOrder?.supplierOrderRequest?.totalQuantity}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>Total Size: </Table.Td>
                <Table.Td>
                  {supplierPayment?.supplierOrder?.supplierOrderRequest?.totalSize.toFixed(2)} KG
                </Table.Td>
              </Table.Tr>
              {/* <Table.Tr>
                <Table.Td colSpan={6}></Table.Td>
                <Table.Td>30000.00</Table.Td>
                <Table.Td>125000.00</Table.Td>
              </Table.Tr> */}
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
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
              {supplierPayment?.payments?.map((item, index) => (
                <Table.Tr key={item._id}>
                  <Table.Td>{item?.method}</Table.Td>
                  <Table.Td>{item?.bank || '-'}</Table.Td>
                  <Table.Td>{item?.branch || '-'}</Table.Td>
                  <Table.Td>{item?.chequeNumber || '-'}</Table.Td>
                  <Table.Td>{item?.amount?.toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td colSpan={3}>
                  {/* {supplierPayment?.status !== 'PAID' && (
                    <Button size="xs" onClick={() => open()}>
                      New Payment Details
                    </Button>
                  )} */}
                </Table.Td>
                <Table.Td>Outstanding</Table.Td>
                <Table.Td>{supplierPayment?.outstanding.toFixed(2)}</Table.Td>
              </Table.Tr>
            </Table>
            <div>
              {supplierPayment?.status !== 'PAID' && (
                <Button
                  onClick={() => open()}
                  style={{ width: '15%', marginTop: 10, float: 'right' }}
                >
                  New Payment
                </Button>
              )}
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewSupplierPayments;
