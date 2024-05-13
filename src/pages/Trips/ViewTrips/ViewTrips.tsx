import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewTrips() {
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
                View Trip Details
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Trip Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Th>Date:</Table.Th>
                <Table.Td>03/04/2024</Table.Td>
                <Table.Th>Vehicle No.:</Table.Th>
                <Table.Td>NW LC 3801</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Driver:</Table.Th>
                <Table.Td>Indika Kumara</Table.Td>
                <Table.Th>From</Table.Th>
                <Table.Td>Warehouse</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Warehouse ID:</Table.Th>
                <Table.Td>WDW-001 Mawathagama</Table.Td>
                <Table.Th>Status:</Table.Th>
                <Table.Td>
                  <Badge color="green" radius="sm" size="sm">
                    ACTIVE
                  </Badge>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Load Details</Text>
            <Table withColumnBorders withRowBorders withTableBorder>
              <Table.Tr>
                <Table.Th>Product Code</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Product Quantity</Table.Th>
                <Table.Th>Product Line Total</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>KSL-15</Table.Td>
                <Table.Td>Keshara Super Lime</Table.Td>
                <Table.Td>15KG</Table.Td>
                <Table.Td>300</Table.Td>
                <Table.Td>4500KG</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>Total Size</Table.Td>
                <Table.Td>4500KG</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Button style={{ float: 'right' }}>Edit</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewTrips;
