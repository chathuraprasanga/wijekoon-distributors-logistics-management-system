import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createExpense,
  fetchCompletedTrips,
  fetchExpenses,
  updateExpense,
} from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';

function AddEditExpenses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
  const expense = useSelector((state: RootState) => state.trips.expense);
  console.log(expense);
  const [expenses, setExpenses] = useState([]);

  const form = useForm({
    initialValues: {
      tripId: '',
      expenses: [],
      totalAmount: 0,
    },
  });

  useEffect(() => {
    dispatch(fetchCompletedTrips());
    if (expense) {
      form.setValues({
        tripId: expense.tripId,
        expenses: expense.expenses,
        totalAmount: expense.totalAmount,
      });
      setExpenses(expense.expenses);
    }
  }, [dispatch, expense]);

  useEffect(() => {
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    form.setFieldValue('totalAmount', totalAmount);
  }, [expenses]);

  const addExpense = () => {
    setExpenses((prevExpenses) => [...prevExpenses, { description: '', amount: '' }]);
  };

  const removeExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  const handleExpenseChange = (index, field, value) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      updatedExpenses[index][field] = value;
      return updatedExpenses;
    });
  };

  const handleSave = async () => {
    form.setFieldValue('expenses', expenses);
    const payload = { ...form.values, expenses };
    // Here you can dispatch a save action or handle form submission
    try {
      await dispatch(createExpense(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Trip Expenses Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset();
      dispatch(fetchExpenses());
      navigate('/admin/expenses');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Expenses',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async () => {
    form.setFieldValue('expenses', expenses);
    const payload = { ...form.values, expenses, id: expense._id };
    // Here you can dispatch a save action or handle form submission
    try {
      await dispatch(updateExpense(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Trip Expenses Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset();
      dispatch(fetchExpenses());
      navigate('/admin/expenses');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Expenses',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
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
                {expense ? 'Edit Expense Details' : 'Add Expense Details'}
              </Text>
            </div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {!expense && (
              <>
                <Text size="sm" fw="bold">
                  Select a Trip:
                </Text>
                <Select
                  size="xs"
                  placeholder="Select a Trip"
                  data={trips.map((trip) => ({
                    value: trip._id.toString(),
                    label: `${trip.tripId} ${trip.date?.split('T')[0] || '-'}`,
                  }))}
                  value={form.values.tripId}
                  onChange={(value) => form.setFieldValue('tripId', value)}
                  allowDeselect={false}
                />
              </>
            )}
            {expense && (
              <>
                <Table withRowBorders={false}>
                  <Table.Tr>
                    <Table.Td width="15%" fw="bold">
                      Trip Id:
                    </Table.Td>
                    <Table.Td width="35%">{expense?.tripId?.tripId}</Table.Td>
                    <Table.Td width="15%" fw="bold">
                      Trip Date:
                    </Table.Td>
                    <Table.Td width="35%">{expense?.tripId?.createdAt.split('T')[0]}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td width="15%" fw="bold">
                      Driver:
                    </Table.Td>
                    <Table.Td width="35%">{expense?.tripId?.driver?.name}</Table.Td>
                    <Table.Td width="15%" fw="bold">
                      Purpose:
                    </Table.Td>
                    <Table.Td width="35%" style={{ textTransform: 'capitalize' }}>
                      {expense?.tripId?.supplierOrder?.supplierOrderRequest?.purpose}
                    </Table.Td>
                  </Table.Tr>
                </Table>
              </>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withColumnBorders withTableBorder withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {expenses.map((expense, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <TextInput
                        placeholder="Enter Description"
                        size="xs"
                        value={expense.description}
                        onChange={(e) => handleExpenseChange(index, 'description', e.target.value)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        placeholder="Enter Amount"
                        size="xs"
                        value={expense.amount}
                        onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                        style={{ textAlign: 'right' }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon variant="light" color="red" onClick={() => removeExpense(index)}>
                        <IconTrash />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    <Button size="xs" onClick={addExpense}>
                      Add Expense
                    </Button>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text size="sm" fw="bold">
                      Total Amount
                    </Text>
                  </Table.Td>
                  <Table.Td align="right">
                    <Text>{form.values.totalAmount.toFixed(2)}</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <div>
            <Button style={{ float: 'right' }} onClick={expense ? handleUpdate : handleSave}>
              {expense ? 'Update' : 'Save'}
            </Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddEditExpenses;
