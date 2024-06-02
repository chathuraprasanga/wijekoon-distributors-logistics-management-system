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
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';

function AddEditEmployees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedEmployee = useSelector((state: RootState) => state.employees.employee);
  const jobRoles = useSelector((state: RootState) => state.employees.jobRoles);

  const [value, setValue] = useState<Date | null>(null);

  const employeeAddEditForm = useForm({
    initialValues: {
      employeeId: selectedEmployee?.employeeId || '',
      name: selectedEmployee?.name || '',
      phone: selectedEmployee?.phone || '',
      phoneSecondary: selectedEmployee?.phoneSecondary || '',
      email: selectedEmployee?.email || '',
      jobRole: selectedEmployee?.jobRole?.name || '',
      dateOfBirth: selectedEmployee?.dateOfBirth ? new Date(selectedEmployee.dateOfBirth) : null,
      nic: selectedEmployee?.nic || '',
      address: selectedEmployee?.address || '',
      status: selectedEmployee?.status || '',
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

  const handleSave = () => {
    const payload = employeeAddEditForm.values;
    console.log(payload);
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
        action=""
        onSubmit={
          !selectedEmployee
            ? () => employeeAddEditForm.onSubmit(handleSave)
            : () => employeeAddEditForm.onSubmit(handleUpdate)
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
                  key={employeeAddEditForm.key('name')}
                  {...employeeAddEditForm.getInputProps('name')}
                />
              </Table.Td>
              {/* <Table.Td width="50%">
                <TextInput
                  label="Employee ID"
                  disabled
                  placeholder="Input placeholder"
                  value="WDE-007"
                />
              </Table.Td> */}
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Phone"
                  withAsterisk
                  placeholder="Enter the phone number"
                  key={employeeAddEditForm.key('phone')}
                  {...employeeAddEditForm.getInputProps('phone')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Phone 02"
                  // withAsterisk
                  placeholder="Enter secondary phone number"
                  key={employeeAddEditForm.key('phoneSecondary')}
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
                  key={employeeAddEditForm.key('email')}
                  {...employeeAddEditForm.getInputProps('email')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <Select
                  withAsterisk
                  label="Employee job Role"
                  placeholder="Select a Role"
                  data={['Admin', 'Sales Rep', 'Driver', 'Helper']}
                  key={employeeAddEditForm.key('jobRole')}
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
                  key={employeeAddEditForm.key('nic')}
                  {...employeeAddEditForm.getInputProps('nic')}
                />
              </Table.Td>
              <Table.Td width="50%">
                <DatePickerInput
                  withAsterisk
                  label="Date of Birth"
                  placeholder="Pick date"
                  value={value}
                  key={employeeAddEditForm.key('dateOfBirth')}
                  {...employeeAddEditForm.getInputProps('dateOfBirth')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%" colSpan={2}>
                <Textarea
                  label="Employee Address"
                  placeholder="Enter the Address"
                  key={employeeAddEditForm.key('address')}
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
                    // {...customerAddEditForm.getInputProps('status')}
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
