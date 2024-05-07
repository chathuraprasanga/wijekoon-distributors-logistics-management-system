import { ActionIcon, Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMail } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewEmployees() {
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
                View Employees
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table withColumnBorders withRowBorders withTableBorder>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Employee ID:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">WDE-001</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Name:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">Chathura Prasanga</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Phone:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">077 9250108</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Email:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">chathuraprasanga98@gmail.com</Text>
              <Text size="sm">
                <ActionIcon size="sm">
                  <IconMail size="xs" />
                </ActionIcon>
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                NIC:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">982833310V</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Date of Birth:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">09.10.1998</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Address:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">godawele watta, kotikapola, mawathagama</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Job Role:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">Super Admin</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Status:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">
                <Badge color="green" radius="sm">
                  ACTIVE
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table>
      </Card>
      <div style={{ marginTop: 10 }}>
        <Link to="/admin/employees/add-edit"><Button style={{ float: 'right' }}>Update Record</Button></Link>
      </div>
    </>
  );
}

export default ViewEmployees;
