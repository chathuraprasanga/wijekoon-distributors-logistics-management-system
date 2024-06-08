import { RootState } from '@/redux/store';
import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewCheques() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chequeData = useSelector((state: RootState) => state.cheques.cheque);

  const customerData = chequeData.customer;
  const orderData = chequeData.order;

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
                      color={
                        chequeData.status === 'PENDING'
                          ? 'yellow'
                          : chequeData.status === 'DEPOSITED'
                            ? 'green'
                            : chequeData.status === 'ACCEPTED'
                              ? 'blue'
                              : chequeData.status === 'REJECTED'
                                ? 'red'
                                : chequeData.status === 'RETURNED'
                                  ? 'violet'
                                  : 'gray'
                      }
                      radius="sm"
                      size="xs"
                    >
                      {chequeData.status.toUpperCase()}
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          {chequeData.status === 'PENDING' && (
            <div style={{ float: 'right' }}>
              <Button ml={10} color="violet">
                Depositted
              </Button>
            </div>
          )}
          {chequeData.status === 'DEPOSITTED' && (
            <div style={{ float: 'right' }}>
              <Button ml={10} color="red">
                Returned
              </Button>
              <Button ml={10}>Accepted</Button>
            </div>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCheques;
