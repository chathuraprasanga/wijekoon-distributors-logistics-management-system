import { updateCheque } from '@/redux/slices/chequesSlice';
import { RootState } from '@/redux/store';
import { Badge, Button, Card, Grid, Group, Modal, Table, Text, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewCheques() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chequeData = useSelector((state: RootState) => state.cheques.cheque);

  // Modal state
  const [modalOpened, setModalOpened] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');

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

  const customerData = chequeData.customer;
  const orderData = chequeData.order;

  const handleAction = async (action: string) => {
    const payload: any = {};
    payload.status = action;
    payload.id = chequeData._id;
    try {
      await dispatch(updateCheque(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: `Cheque Status Updated to Successfully`,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      navigate('/admin/cheques');
    } catch (error) {
      console.error('Error updating cheque:', error);
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Cheque',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
    setModalOpened(false);
  };

  const openModal = (action: string) => {
    setConfirmAction(action);
    setModalOpened(true);
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
                View Cheque Details
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Customer Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Name:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>{customerData.fullName}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Phone:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>
                    {customerData.phone} | {customerData.phoneSecondary}
                  </Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Email:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>{customerData.email}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Address:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>{customerData.address}</Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Order Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Date:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>{orderData.createdAt.split('T')[0]}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Order ID:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>{orderData.orderId}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Amount:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>LKR {orderData.netTotal.toFixed(2)}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold"></Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text></Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Cheque Details Details</Text>
            <Table withRowBorders withColumnBorders withTableBorder>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Cheque Number:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{chequeData.chequeNumber}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Bank:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{chequeData.bank}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Branch
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{chequeData.branch}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Amount:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">LKR {chequeData.amount}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Deposit Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{chequeData.depositDate?.split('T')[0]}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Status:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">
                    <Badge
                      color={(() => {
                        switch (chequeData.status) {
                          case 'PENDING':
                            return 'yellow';
                          case 'DEPOSITTED':
                            return 'green';
                          case 'ACCEPTED':
                            return 'blue';
                          case 'RETURNED':
                            return 'red';
                          default:
                            return 'gray';
                        }
                      })()}
                      radius="xs"
                      size="xs"
                    >
                      {chequeData?.status}
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        {hasPrivilege('EDIT_CHEQUES') && (
          <Grid.Col>
            {chequeData.status === 'PENDING' && (
              <div style={{ float: 'right' }}>
                <Button ml={10} color="violet" onClick={() => openModal('DEPOSITED')}>
                  Deposit
                </Button>
              </div>
            )}
            {chequeData.status === 'DEPOSITED' && (
              <div style={{ float: 'right' }}>
                <Button ml={10} color="red" onClick={() => openModal('RETURNED')}>
                  Returned
                </Button>
                <Button ml={10} onClick={() => openModal('ACCEPTED')}>
                  Accepted
                </Button>
              </div>
            )}
            {chequeData.status === 'RETURNED' && (
              <div style={{ float: 'right' }}>
                <Button ml={10} onClick={() => openModal('DEPOSITED')}>
                  Redeposit
                </Button>
              </div>
            )}
          </Grid.Col>
        )}
      </Grid>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={`Confirm ${confirmAction} Action`}
      >
        <Text>Are you sure you want to {confirmAction.toLowerCase()} this cheque?</Text>
        <Group position="apart" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            color={
              confirmAction === 'DEPOSITED'
                ? 'green'
                : confirmAction === 'ACCEPTED'
                  ? 'blue'
                  : confirmAction === 'RETURNED'
                    ? 'red'
                    : 'blue'
            }
            onClick={() => handleAction(confirmAction)}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default ViewCheques;
