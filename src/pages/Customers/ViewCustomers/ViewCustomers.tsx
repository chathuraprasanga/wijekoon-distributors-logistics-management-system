import { ActionIcon, Badge, Button, Card, Divider, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewCustomers() {
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
                View Customer
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
              <Text>Chathura Prasanga</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Email</Text>
            </Table.Td>
            <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>chathuraprasanga98@gmail.com</Text>
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
              <Text>077 9250108</Text>
              <Text>075 0943040</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Hardware Name</Text>
            </Table.Td>
            <Table.Td>
              <Text>N/A</Text>
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
              <Text>Registration Type</Text>
            </Table.Td>
            <Table.Td>
              <Text>Self Registration</Text>
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
          <Link to="/admin/add-edit-customers">
            <Button>Edit Record</Button>
          </Link>
        </div>

        <Divider my="md" />
      </Card>
    </>
  );
}

export default ViewCustomers;
