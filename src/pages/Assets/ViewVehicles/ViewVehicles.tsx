import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewVehicles() {
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
                View Vehicle
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withColumnBorders withRowBorders withTableBorder>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Vehicle ID:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">Vehicle ID:</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Vehicle Number:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">NW LC-3801</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Brand:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">Mitshubisi</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Vehicle capacity:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">8500KG</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    status:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">
                    <Badge color="green" radius="sm">
                      ACTIVE
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Link to="/admin/vehicles/add-edit"><Button style={{ float: 'right' }}>Update</Button></Link>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewVehicles;
