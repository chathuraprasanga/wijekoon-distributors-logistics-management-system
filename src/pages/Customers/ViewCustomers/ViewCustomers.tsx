import { ActionIcon, Badge, Button, Card, Divider, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/redux/store';
// import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function ViewCustomers() {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.customers.customer);

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
              <Text>{customer.fullName}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Email</Text>
            </Table.Td>
            <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>{customer.email}</Text>
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
              <Text>{customer.phone}</Text>
              <Text>{customer?.phoneSecondary || '-'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Hardware Name</Text>
            </Table.Td>
            <Table.Td>
              <Text>{customer?.hardwareName || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Address</Text>
            </Table.Td>
            <Table.Td>
              <Text>{customer?.address}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Status</Text>
            </Table.Td>
            <Table.Td>
              <Text>
                <Badge color={customer?.status === 'ACTIVE' ? 'green' : 'red'} radius="sm">
                  {customer?.status}
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
          {/* improvements */}
          {/* <Table.Tr>
            <Table.Td width={200}>
              <Text>Registration Type</Text>
            </Table.Td>
            <Table.Td>
              <Text>Self Registration</Text>
            </Table.Td>
          </Table.Tr> */}
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Notes</Text>
            </Table.Td>
            <Table.Td rowSpan={2}>
              <Text>{customer?.notes}</Text>
            </Table.Td>
          </Table.Tr>
        </Table>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          {hasPrivilege('EDIT_CUSTOMERS') && (
            <Link to="/admin/customers/add-edit">
              <Button>Edit Record</Button>
            </Link>
          )}
        </div>

        <Divider my="md" />
      </Card>
    </>
  );
}

export default ViewCustomers;
