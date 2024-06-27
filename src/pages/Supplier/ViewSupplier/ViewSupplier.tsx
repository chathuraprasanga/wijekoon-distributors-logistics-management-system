import { hasPrivilege } from '@/helpers/utils/permissionHandler';
import { RootState } from '@/redux/store';
import { ActionIcon, Badge, Button, Card, Divider, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewSupplier() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supplier = useSelector((state: RootState) => state.suppliers.supplier);

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
              <Text>{supplier?.name}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Email</Text>
            </Table.Td>
            <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>{supplier?.email}</Text>
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
              <Text>{supplier?.phone}</Text>
              <Text>{supplier?.phoneSecondary}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Address</Text>
            </Table.Td>
            <Table.Td>
              <Text>{supplier?.address}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Status</Text>
            </Table.Td>
            <Table.Td>
              <Text>
                <Badge color={supplier.status === 'ACTIVE' ? 'green' : 'red'} radius="sm" size="xs">
                  {supplier?.status}
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Cheque Payment Destination</Text>
            </Table.Td>
            <Table.Td>
              <Text>{supplier?.chequePaymentDestination}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Notes</Text>
            </Table.Td>
            <Table.Td rowSpan={2}>
              <Text>{supplier?.notes}</Text>
            </Table.Td>
          </Table.Tr>
        </Table>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          {hasPrivilege('EDIT_SUPPLIERS') && (
            <Link to="/admin/suppliers/add-edit">
              <Button>Edit Record</Button>
            </Link>
          )}
        </div>

        <Divider my="md" />
      </Card>
    </>
  );
}

export default ViewSupplier;
