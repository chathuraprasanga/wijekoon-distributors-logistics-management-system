import { hasPrivilege } from '@/helpers/utils/permissionHandler';
import { RootState } from '@/redux/store';
import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ViewVehicles() {
  const vehicle = useSelector((state: RootState) => state.assets.vehicle);

  // due to the permission handler is not works
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

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
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
                  <Text size="sm">{vehicle?.vehicleId}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Vehicle Number:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">{vehicle?.number}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Brand:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">{vehicle?.brand}</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Vehicle capacity:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">{vehicle?.capacity} KG</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Text size="sm" fw="bold">
                    Status:
                  </Text>
                </Table.Td>
                <Table.Td width="30%">
                  <Text size="sm">
                    <Badge
                      color={vehicle.status === 'ACTIVE' ? 'green' : 'red'}
                      radius="xs"
                      size="xs"
                    >
                      {vehicle?.status}
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            {hasPrivilege('EDIT_VEHICLES') && (
              <Link to="/admin/vehicles/add-edit">
                <Button style={{ float: 'right' }}>Update</Button>
              </Link>
            )}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewVehicles;
