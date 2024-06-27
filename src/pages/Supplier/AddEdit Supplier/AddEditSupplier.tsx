import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Grid,
  Select,
  Switch,
  Table,
  Text,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { useForm, isNotEmpty } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createSupplier, fetchSuppliers, updateSupplier } from '@/redux/slices/supplierSlice'; // Import necessary actions

function AddEditSupplier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSupplier = useSelector((state: RootState) => state.suppliers.supplier);

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

  const supplierAddEditForm = useForm({
    initialValues: {
      name: selectedSupplier?.name || '',
      email: selectedSupplier?.email || '',
      phone: selectedSupplier?.phone || '',
      phoneSecondary: selectedSupplier?.phoneSecondary || '',
      chequePaymentDestination: selectedSupplier?.chequePaymentDestination || '',
      address: selectedSupplier?.address || '',
      notes: selectedSupplier?.notes || '',
      status: selectedSupplier?.status || 'DEACTIVE',
    },

    validate: {
      name: isNotEmpty('Name is required'),
      email: isNotEmpty('Email is required'),
      phone: isNotEmpty('Phone is required'),
      address: isNotEmpty('Street 1 is required'),
    },
  });

  const handleSave = async (values: any) => {
    try {
      await dispatch(createSupplier(values)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      supplierAddEditForm.reset(); // Reset the form state
      navigate('/admin/suppliers');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the supplier',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      await dispatch(updateSupplier({ id: selectedSupplier._id, data: values })).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      supplierAddEditForm.reset(); // Reset the form state
      dispatch(fetchSuppliers());
      navigate('/admin/suppliers');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the supplier',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    if (selectedSupplier) {
      supplierAddEditForm.setValues({
        name: selectedSupplier.name,
        email: selectedSupplier.email,
        phone: selectedSupplier.phone,
        phoneSecondary: selectedSupplier.phoneSecondary,
        chequePaymentDestination: selectedSupplier.chequePaymentDestination,
        address: selectedSupplier.address,
        notes: selectedSupplier.notes,
        status: selectedSupplier.status,
      });
    }
  }, [selectedSupplier]);

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
                {selectedSupplier ? 'Edit' : 'Add'} Supplier
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form
          onSubmit={
            selectedSupplier
              ? supplierAddEditForm.onSubmit(handleUpdate) // Use handleUpdate for editing
              : supplierAddEditForm.onSubmit(handleSave) // Use handleSave for creating
          }
        >
          <Table withRowBorders={false}>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>
                  <TextInput
                    label="Supplier Name"
                    withAsterisk
                    placeholder="Enter Supplier Name"
                    {...supplierAddEditForm.getInputProps('name')}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    label="Supplier Email"
                    withAsterisk
                    placeholder="Enter Supplier Email"
                    {...supplierAddEditForm.getInputProps('email')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <TextInput
                    label="Supplier Phone 01"
                    withAsterisk
                    placeholder="Enter Supplier Primary Phone"
                    {...supplierAddEditForm.getInputProps('phone')}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    label="Supplier Phone 02"
                    placeholder="Enter Supplier Secondary Phone"
                    {...supplierAddEditForm.getInputProps('phoneSecondary')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={2}>
                  <TextInput
                    label="Cheque Payment Destination"
                    placeholder="Enter Cheque Payment Destination"
                    {...supplierAddEditForm.getInputProps('chequePaymentDestination')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={2}>
                  <Textarea
                    label="Address"
                    withAsterisk
                    placeholder="Enter Address"
                    {...supplierAddEditForm.getInputProps('address')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={2}>
                  <Textarea
                    size="md"
                    label="Notes"
                    placeholder="Enter Notes"
                    {...supplierAddEditForm.getInputProps('notes')}
                  />
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  {selectedSupplier && (
                    <>
                      <Select
                        color="violet"
                        size="xs"
                        radius="sm"
                        data={['ACTIVE', 'DEACTIVE']}
                        {...supplierAddEditForm.getInputProps('status')}
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

export default AddEditSupplier;
