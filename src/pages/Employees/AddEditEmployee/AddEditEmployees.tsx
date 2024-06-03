import { Button, Card, Grid, Select, Table, Text, TextInput, Textarea, rem } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { isNotEmpty, useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@/redux/store';
import {
  createEmployee,
  fetchEmployees,
  fetchJobRoles,
  updateEmployee,
} from '@/redux/slices/employeeSlice';

interface EmployeeFormValues {
  employeeId: string;
  name: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  jobRole: string;
  dateOfBirth: Date | null;
  nic: string;
  address: string;
  status: string;
}

function AddEditEmployees() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const selectedEmployee = useSelector((state: RootState) => state.employees.employee);
  const jobRoles = useSelector((state: RootState) => state.employees.jobRoles);
  const status = useSelector((state: RootState) => state.employees.status);
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobRoles());
    }
  }, [status, dispatch]);

  const employeeAddEditForm = useForm<EmployeeFormValues>({
    initialValues: {
      employeeId: selectedEmployee?.employeeId || '',
      name: selectedEmployee?.name || '',
      phone: selectedEmployee?.phone || '',
      phoneSecondary: selectedEmployee?.phoneSecondary || '',
      email: selectedEmployee?.email || '',
      jobRole: selectedEmployee?.jobRole?._id || '',
      dateOfBirth: selectedEmployee?.dateOfBirth ? new Date(selectedEmployee.dateOfBirth) : null,
      nic: selectedEmployee?.nic || '',
      address: selectedEmployee?.address || '',
      status: selectedEmployee?.status || 'ACTIVE',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      phone: isNotEmpty('Phone is required'),
      email: isNotEmpty('Email is required'),
      jobRole: isNotEmpty('Job Role is required'),
      nic: isNotEmpty('NIC is required'),
      dateOfBirth: isNotEmpty('Date of birth is required'),
    },
  });

  const handleSave = async (values: EmployeeFormValues) => {
    try {
      await dispatch(createEmployee(values)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Employee created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      employeeAddEditForm.reset();
      dispatch(fetchEmployees());
      navigate('/admin/employees');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the employee',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (values: EmployeeFormValues) => {
    const payload = {
      ...values,
      id: selectedEmployee?._id,
    };
    try {
      await dispatch(updateEmployee(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Employee updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      employeeAddEditForm.reset();
      dispatch(fetchEmployees());
      navigate('/admin/employees');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the employee',
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
                {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <form
        onSubmit={
          !selectedEmployee
            ? employeeAddEditForm.onSubmit(handleSave)
            : employeeAddEditForm.onSubmit(handleUpdate)
        }
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td width="50%" colSpan={2}>
                <TextInput
                  label="Employee Name"
                  withAsterisk
                  placeholder="Enter the name"
                  {...employeeAddEditForm.getInputProps('name')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Phone"
                  withAsterisk
                  placeholder="Enter the phone number"
                  {...employeeAddEditForm.getInputProps('phone')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Phone 02"
                  placeholder="Enter secondary phone number"
                  {...employeeAddEditForm.getInputProps('phoneSecondary')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Email"
                  withAsterisk
                  placeholder="Enter Email"
                  {...employeeAddEditForm.getInputProps('email')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <Select
                  withAsterisk
                  label="Employee Job Role"
                  placeholder="Select a Role"
                  data={jobRoles.map((role) => ({
                    label: role.name,
                    value: role._id,
                  }))}
                  {...employeeAddEditForm.getInputProps('jobRole')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput
                  label="Employee NIC"
                  withAsterisk
                  placeholder="Enter the NIC"
                  {...employeeAddEditForm.getInputProps('nic')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <DatePickerInput
                  withAsterisk
                  label="Date of Birth"
                  placeholder="Pick date"
                  value={value}
                  onChange={setValue}
                  {...employeeAddEditForm.getInputProps('dateOfBirth')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%" colSpan={2}>
                <Textarea
                  label="Employee Address"
                  placeholder="Enter the Address"
                  {...employeeAddEditForm.getInputProps('address')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td mt={5}>
                {selectedEmployee && (
                  <Select
                    color="violet"
                    size="xs"
                    radius="sm"
                    data={['ACTIVE', 'DEACTIVE']}
                    {...employeeAddEditForm.getInputProps('status')}
                  />
                )}
              </Table.Td>
            </Table.Tr>
          </Table>
        </Card>
        <div style={{ marginTop: 10 }}>
          <Button style={{ float: 'right' }} type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddEditEmployees;
