import {
  Grid,
  Card,
  Table,
  Badge,
  Button,
  Text,
  TextInput,
  rem,
  Group,
  Modal,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import {
  getSupplierOrderRequestById,
  updateSupplierOrderRequestStatus,
} from '@/redux/slices/supplierSlice';
import { setPaymenets } from '@/redux/slices/chequesSlice';

function ViewSupplierOrderRequests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const status = useSelector((state: RootState) => state.suppliers.status);
  const error = useSelector((state: RootState) => state.suppliers.error);
  const selectedRequest = useSelector((state: RootState) => state.suppliers.supplierOrderRequest);
  const supplierData = selectedRequest.supplier;
  const [reason, setReason] = useState('');

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

  const handleRejected = async () => {
    const newStatus: any = {};
    newStatus.status = 'REJECTED';
    newStatus.reason = reason;
    newStatus.id = selectedRequest._id;

    try {
      await dispatch(updateSupplierOrderRequestStatus(newStatus)).unwrap();
      await dispatch(getSupplierOrderRequestById(selectedRequest._id)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier order rejected successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      modals.closeAll();
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the supplier order rejecting',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const confirm = () => {
    setOpened(true);
  };
  const handleRequestConfirmed = async () => {
    const newStatus: any = {};
    newStatus.status = 'CONFIRMED';
    // newStatus.reason = reason;
    newStatus.id = selectedRequest._id;

    try {
      await dispatch(updateSupplierOrderRequestStatus(newStatus)).unwrap();
      await dispatch(getSupplierOrderRequestById(selectedRequest._id)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier order confirmed successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      modals.closeAll();
      setOpened(false);
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the supplier order confirming',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleCreateOrder = () => {
    dispatch(setPaymenets(null));
    navigate('/admin/suppliers/add-orders');
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
                  View Supplier Order Requests
                </Text>
              </div>
              <div></div>
            </div>
          </Grid.Col>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" style={{ fontWeight: 'bold' }}>
                Supplier Details
              </Text>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Name:
                  </Table.Td>
                  <Table.Td width="35%">{supplierData?.name}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Created Date:
                  </Table.Td>
                  <Table.Td width="35%">{selectedRequest?.createdAt?.split('T')[0]}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td width="35%">
                    {supplierData?.phone} | {supplierData?.phoneSecondary}
                  </Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Purpose:
                  </Table.Td>
                  <Table.Td width="35%" style={{ textTransform: 'capitalize' }}>
                    {selectedRequest?.purpose}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td width="35%">{supplierData?.email}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Expected Date:
                  </Table.Td>
                  <Table.Td width="35%">{selectedRequest?.expectedDate.split('T')[0]}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td width="35%">{supplierData?.address}</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Status:
                  </Table.Td>
                  <Table.Td width="35%">
                    <Badge
                      size="xs"
                      radius="sm"
                      color={(() => {
                        switch (selectedRequest?.status) {
                          case 'PENDING':
                            return 'yellow';
                          case 'CONFIRMED':
                            return 'green';
                          case 'COMPLETED':
                            return 'blue';
                          case 'REJECTED':
                            return 'red';
                          default:
                            return 'gray'; // Default color if status is not recognized
                        }
                      })()}
                    >
                      {selectedRequest?.status}
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
                  <Table.Th>Line Total</Table.Th>
                </Table.Tr>
                {selectedRequest?.order.map((element: any, index: any) => (
                  <Table.Tr key={element._id}>
                    <Table.Td>{element?.product?.code}</Table.Td>
                    <Table.Td>{element?.product?.name}</Table.Td>
                    <Table.Td>{element?.product?.size}</Table.Td>
                    <Table.Td>{element?.product?.sellingPrice}</Table.Td>
                    <Table.Td>{element?.quantity}</Table.Td>
                    <Table.Td>{element?.lineTotal?.toFixed(2)}</Table.Td>
                  </Table.Tr>
                ))}

                <Table.Tr>
                  <Table.Td colSpan={4}></Table.Td>
                  <Table.Td>Total Quantity:</Table.Td>
                  <Table.Td>{selectedRequest?.totalQuantity}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={4}></Table.Td>
                  <Table.Td>Total Size:</Table.Td>
                  <Table.Td>{selectedRequest?.totalSize} KG</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={4}></Table.Td>
                  <Table.Td>Total Amount:</Table.Td>
                  <Table.Td>{selectedRequest?.netTotal.toFixed(2)}</Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {selectedRequest?.status === 'PENDING' && (
                <>
                  <Button
                    ml={10}
                    color="red"
                    onClick={() => {
                      modals.open({
                        title: 'Reject Supplier Order Request',
                        children: (
                          <>
                            <TextInput
                              label="Reason"
                              placeholder="Reason for Reject"
                              data-autofocus
                              onChange={(event) => setReason(event.currentTarget.value)}
                            />
                            <Button fullWidth onClick={handleRejected} mt="md" color="red">
                              Reject
                            </Button>
                          </>
                        ),
                      });
                    }}
                  >
                    Reject Request
                  </Button>
                  <Button ml={10} color="teal" onClick={confirm}>
                    Confirm Request
                  </Button>
                </>
              )}
              {selectedRequest.status === 'CONFIRMED' && (
                <Button ml={10} color="violet" onClick={handleCreateOrder}>
                  Create Order
                </Button>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </ModalsProvider>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to confirm the order request {selectedRequest?.orderId}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleRequestConfirmed}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default ViewSupplierOrderRequests;
