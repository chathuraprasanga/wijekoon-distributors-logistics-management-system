import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewCheques() {
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
                  <Text>Chathura Prasanga</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Phone:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>077 9250108 | 075 0943040</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Email:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>chathuraprasanga98@gmail.com</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Address:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>Godawele Watta, Kotikapola, Mawathagama</Text>
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
                  <Text>03.04.2024</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold">Order ID:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>WDS-0056</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold">Amount:</Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text>LKR 120000.00</Text>
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
                  <Text size="sm">123456</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Bank:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">7135 Peoples Bank</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Branch
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">116</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Amount:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">LKR 120000.00</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Deposit Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">18.04.2024</Text>
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
                    <Badge color="teal" radius="sm" size="sm">
                      Deposited
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div style={{ float: 'right' }}>
            <Button ml={10} color="red">
              Returned
            </Button>
            <Button ml={10}>Accepted</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCheques;
