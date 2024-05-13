import { Button, Card, Grid, Select, Table, Text, TextInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddEditExpenses() {
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
                Add Expenses Details
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder display="flex">
            <Text size="sm" fw="bold">
              Select a Trip:
            </Text>
            <Select
              width="40"
              placeholder="Selct a Trip"
              data={['WDT-006 04.04.2024', 'WDT-007 05.04.2024', 'WDT-008 06.04.2024']}
            />
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder display="flex">
            <Table withColumnBorders withTableBorder withRowBorders>
              <Table.Tr>
                <Table.Th>Description</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput placeholder="Enter Description" value="Diesel" />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Input placeholder"
                    style={{ textAlign: 'right' }}
                    value="LKR 5000.00"
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <Button size="xs">Add Expense</Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <Text size="sm" fw="bold">
                    Total Amount
                  </Text>
                </Table.Td>
                <Table.Td align="right">
                  <Text>LKR 5000.00</Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Button style={{ float: 'right' }}>Save</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddEditExpenses;
