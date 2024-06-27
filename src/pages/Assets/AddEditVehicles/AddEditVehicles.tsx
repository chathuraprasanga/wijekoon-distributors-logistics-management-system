import { Button, Card, Grid, Select, Switch, Table, Text, TextInput, rem } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createVehicle, fetchVehicles, updateVehicle } from '@/redux/slices/assetsSlice';
import { RootState } from '@/redux/store';
import { fetchCustomers } from '@/redux/slices/customerSlice';
import { Notifications } from '@mantine/notifications';

function AddEditVehicles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.assets.status);
  const error = useSelector((state: RootState) => state.assets.error);
  const selectedVehicle = useSelector((state: RootState) => state.assets.vehicle);

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
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  const vehicleAddEditForm = useForm({
    initialValues: {
      number: selectedVehicle?.number || '',
      type: selectedVehicle?.type || '',
      brand: selectedVehicle?.brand || '',
      capacity: selectedVehicle?.capacity || '',
      status: selectedVehicle?.status || 'ACTIVE',
    },
    validate: {
      number: isNotEmpty('Vehicle number is required'),
      type: isNotEmpty('Vehicle type is required'),
      brand: isNotEmpty('Brand is required'),
      capacity: (value) => {
        if (!value) {
          return 'Capacity is required';
        }
        if (isNaN(value)) {
          return 'Capacity must be a number';
        }
        return null;
      },
    },
  });

  const handleSave = async (event: any) => {
    // event.preventDefault();
    try {
      const payload = vehicleAddEditForm.values;
      await dispatch(createVehicle(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Vehicle crated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      vehicleAddEditForm.reset(); // Reset the form state
      dispatch(fetchVehicles());
      navigate('/admin/vehicles');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the vehicle',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (event: any) => {
    const vehicleId = selectedVehicle._id;
    const payload = { ...vehicleAddEditForm.values, _id: vehicleId };
    try {
      await dispatch(updateVehicle(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Vehicle updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      vehicleAddEditForm.reset(); // Reset the form state
      dispatch(fetchVehicles());
      navigate('/admin/vehicles');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the vehicle',
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
                {selectedVehicle ? 'Edit' : 'Add'} Vehicle
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <form
        action=""
        onSubmit={
          selectedVehicle
            ? vehicleAddEditForm.onSubmit(handleUpdate)
            : vehicleAddEditForm.onSubmit(handleSave)
        }
      >
        <Grid>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width="50%">
                    <TextInput
                      label="Vehicle Number"
                      withAsterisk
                      placeholder="Enter Vehicle Number"
                      key={vehicleAddEditForm.key('number')}
                      {...vehicleAddEditForm.getInputProps('number')}
                    />
                  </Table.Td>
                  <Table.Td width="50%">
                    <Select
                      label="Vehicle Type"
                      withAsterisk
                      placeholder="Select Vehicle Type"
                      data={['Lorry', 'Car', 'Bike']}
                      key={vehicleAddEditForm.key('type')}
                      {...vehicleAddEditForm.getInputProps('type')}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="50%">
                    <TextInput
                      label="Vehicle Brand"
                      withAsterisk
                      placeholder="Enter Vehicle Brand"
                      key={vehicleAddEditForm.key('brand')}
                      {...vehicleAddEditForm.getInputProps('brand')}
                    />
                  </Table.Td>
                  <Table.Td width="50%">
                    <TextInput
                      label="Vehicle Capacity"
                      withAsterisk
                      placeholder="Enter Vehicle Capacity"
                      key={vehicleAddEditForm.key('capacity')}
                      {...vehicleAddEditForm.getInputProps('capacity')}
                    />
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    {selectedVehicle && (
                      <>
                        <Select
                          color="violet"
                          size="xs"
                          radius="sm"
                          data={['ACTIVE', 'DEACTIVE']}
                          {...vehicleAddEditForm.getInputProps('status')}
                        />
                      </>
                    )}
                  </Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <div>
              <Button style={{ float: 'right' }} type="submit">
                Save
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default AddEditVehicles;
