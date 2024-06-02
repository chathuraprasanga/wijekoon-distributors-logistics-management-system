import {
  Button,
  Card,
  Grid,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { createCustomer, fetchCustomers, updateCustomer } from '@/redux/slices/customerSlice'; // Import updateCustomer action

function AddEditCustomers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCustomer = useSelector((state: RootState) => state.customers.customer);

  const customerAddEditForm = useForm({
    initialValues: {
      fullName: selectedCustomer?.fullName || '',
      type: selectedCustomer?.type || '',
      email: selectedCustomer?.email || '',
      hardwareName: selectedCustomer?.hardwareName || '',
      phone: selectedCustomer?.phone || '',
      phoneSecondary: selectedCustomer?.phoneSecondary || '',
      status: selectedCustomer?.status || '',
      address: selectedCustomer?.address || '',
    },

    validate: {
      fullName: isNotEmpty('Name is required'),
      type: isNotEmpty('Type is required'),
      email: isNotEmpty('Email is required'),
      hardwareName: (value, values) =>
        values.type === 'Hardware Store' && !value ? 'Hardware name is required' : null,
      phone: isNotEmpty('Phone is required'),
      address: isNotEmpty('Address is required'),
    },
  });

  const handleSave = async (values: any) => {
    try {
      await dispatch(createCustomer(values)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      customerAddEditForm.reset(); // Reset the form state
      navigate('/admin/customers');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      await dispatch(updateCustomer({ id: selectedCustomer._id, data: values })).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      customerAddEditForm.reset(); // Reset the form state
      dispatch(fetchCustomers());
      navigate('/admin/customers');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the customer',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      customerAddEditForm.setValues({
        fullName: selectedCustomer.fullName,
        type: selectedCustomer.type,
        email: selectedCustomer.email,
        hardwareName: selectedCustomer.hardwareName,
        phone: selectedCustomer.phone,
        phoneSecondary: selectedCustomer.phoneSecondary,
        status: selectedCustomer.status,
        address: selectedCustomer.address,
      });
    }
  }, [selectedCustomer]);

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
                {selectedCustomer ? 'Edit' : 'Add'} Customer
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form
          onSubmit={
            selectedCustomer
              ? customerAddEditForm.onSubmit(handleUpdate) // Use handleUpdate for editing
              : customerAddEditForm.onSubmit(handleSave) // Use handleSave for creating
          }
        >
          <Table withRowBorders={false}>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <TextInput
                    label="Customer Name"
                    withAsterisk
                    placeholder="Enter Customer Name"
                    {...customerAddEditForm.getInputProps('fullName')}
                  />
                </Table.Td>
                <Table.Td>
                  <Select
                    label="Customer Type"
                    placeholder="Select Customer Type"
                    data={['Hardware Store', 'Individual Customer']}
                    {...customerAddEditForm.getInputProps('type')}
                    onChange={(value) => customerAddEditForm.setFieldValue('type', value)}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <TextInput
                    label="Customer Email"
                    withAsterisk
                    placeholder="Enter Customer Email"
                    {...customerAddEditForm.getInputProps('email')}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    disabled={customerAddEditForm.values.type !== 'Hardware Store'}
                    label="Hardware Name"
                    withAsterisk={customerAddEditForm.values.type === 'Hardware Store'}
                    placeholder="Enter Hardware Name"
                    {...customerAddEditForm.getInputProps('hardwareName')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <TextInput
                    label="Customer Phone 01"
                    withAsterisk
                    placeholder="Enter Customer Primary Phone"
                    {...customerAddEditForm.getInputProps('phone')}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    label="Customer Phone 02"
                    placeholder="Enter Customer Secondary Phone"
                    {...customerAddEditForm.getInputProps('phoneSecondary')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={2}>
                  <Textarea
                    withAsterisk
                    size="md"
                    label="Address"
                    placeholder="Enter Address"
                    {...customerAddEditForm.getInputProps('address')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={2}>
                  <Textarea
                    size="md"
                    label="Notes"
                    placeholder="Enter Notes"
                    {...customerAddEditForm.getInputProps('notes')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  {selectedCustomer && (
                    <>
                    <Select
                      color="violet"
                      size="xs"
                      radius="sm"
                      data={['ACTIVE', 'DEACTIVE']}
                      {...customerAddEditForm.getInputProps('status')}
                    />
                    </>
                  )}
                </Table.Td>
                <Table.Td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    style={{ width: 100 }}
                    variant="filled"
                    color="violet"
                    size="sm"
                    type="submit"
                  >
                    Save
                  </Button>
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </form>
      </Card>
    </>
  );
}

export default AddEditCustomers;
