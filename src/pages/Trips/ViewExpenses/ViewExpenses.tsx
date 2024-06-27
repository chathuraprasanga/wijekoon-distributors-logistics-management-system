// import { hasAnyPrivilege, hasPrivilege } from '@/helpers/utils/permissionHandler';
import { fetchExpenses } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import { Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ViewExpenses() {
  const dispatch = useDispatch();
  const expense = useSelector((state: RootState) => state.trips.expense);

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

  useEffect(() => {
    dispatch(fetchExpenses);
  }, [dispatch]);

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
                  <Text size="sm">{expense?.tripId?.tripId}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{expense.tripId.createdAt.split('T')[0]}</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Driver:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{expense.tripId.driver?.name || 'N/A'}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Vehicle:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{expense?.tripId?.vehicle?.number || 'N/A'}</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Purpose:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm" style={{ textTransform: 'capitalize' }}>
                    {expense.tripId.supplierOrder.supplierOrderRequest.purpose}
                  </Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Total Expenses:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{expense.totalAmount.toFixed(2)}</Text>
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
              {expense.expenses.map((item, index) => (
                <Table.Tr>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{item.description}</Table.Td>
                  <Table.Td>{item.amount.toFixed(2)}</Table.Td>
                </Table.Tr>
              ))}
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            {hasPrivilege('EDIT_EXPENSES') && (
              <Link to="/admin/expenses/add-edit">
                <Button style={{ float: 'right' }}>Edit Records</Button>
              </Link>
            )}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewExpenses;
