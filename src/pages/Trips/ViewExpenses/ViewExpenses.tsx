import { Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewExpenses() {
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
                View Expenses Details
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Trip Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Trip ID:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">WDT-006</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">02.04.2024</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Driver:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">Indika Kumara</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Vehicle:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">NW LC 3801</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Purpose:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">For Delivery</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Total Amount:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">LKR 6000.00</Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Expenses Details</Text>
            <Table>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>01</Table.Td>
                <Table.Td>Lunch</Table.Td>
                <Table.Td>LKR 1000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>02</Table.Td>
                <Table.Td>Deisel</Table.Td>
                <Table.Td>LKR 5000.00</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Link to="/admin/expenses/add-edit"><Button style={{ float: 'right' }}>Edit Records</Button></Link>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewExpenses;
