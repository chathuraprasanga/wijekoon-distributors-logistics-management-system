import { ActionIcon, Badge, Button, Card, Divider, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewSupplier() {
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
                View Supplier
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table withTableBorder withColumnBorders>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Name</Text>
            </Table.Td>
            <Table.Td>
              <Text>Keshara Minerals and Chemicals</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Email</Text>
            </Table.Td>
            <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>kesharamineralsandc@gmail.com</Text>
              <Link to="">
                <ActionIcon variant="filled" aria-label="Settings">
                  <IconMailForward style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Link>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200} style={{ alignContent: 'start' }}>
              <Text>Phone</Text>
            </Table.Td>
            <Table.Td>
              <Text>081 5236987</Text>
              <Text>077 7123456</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Address</Text>
            </Table.Td>
            <Table.Td>
              <Text>Godawele Watta, Kotikapola, Mawathagama, Kurunegala</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Status</Text>
            </Table.Td>
            <Table.Td>
              <Text>
                <Badge color="green" radius="sm">
                  ACTIVE
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Cheque Payment Destination</Text>
            </Table.Td>
            <Table.Td>
              <Text>Keshara Minerals and Chemicals (PVT) Ltd.</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Notes</Text>
            </Table.Td>
            <Table.Td rowSpan={2}>
              <Text>-</Text>
            </Table.Td>
          </Table.Tr>
        </Table>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <Link to="/admin/suppliers/add-edit">
            <Button>Edit Record</Button>
          </Link>
        </div>

        <Divider my="md" />
      </Card>
    </>
  );
}

export default ViewSupplier;
