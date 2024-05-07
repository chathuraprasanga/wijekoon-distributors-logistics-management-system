import { Button, Card, Grid, Select, Switch, Table, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddEditEmployees() {
  const [value, setValue] = useState<Date | null>(null);
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
                Add Employees
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form action="">
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput label="Employee Name" withAsterisk placeholder="Enter the name" />
              </Table.Td>
              <Table.Td width="50%">
                <TextInput
                  label="Employee ID"
                  disabled
                  placeholder="Input placeholder"
                  value="WDE-007"
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput
                  label="Employee Phone"
                  withAsterisk
                  placeholder="Enter the phone number"
                />
              </Table.Td>
              <Table.Td width="50%">
                <TextInput label="Employee Email" withAsterisk placeholder="Enter Email" />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <Select
                  withAsterisk
                  label="Employee job Role"
                  placeholder="Select a Role"
                  data={['Admin', 'Sales Rep', 'Driver', 'Helper']}
                />
              </Table.Td>
              <Table.Td width="50%">
                <DatePickerInput
                  withAsterisk
                  label="Date of Birth"
                  placeholder="Pick date"
                  value={value}
                  onChange={setValue}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td width="50%">
                <TextInput label="Employee NIC" withAsterisk placeholder="Enter the NIC" />
              </Table.Td>
              <Table.Td width="50%">
                <TextInput label="Employee Address" placeholder="Enter the Address" />
              </Table.Td>
            </Table.Tr>
            <Table.Tr mt={5}>
              <Switch defaultChecked color="violet" labelPosition="left" label="Status" />
            </Table.Tr>
          </Table>
        </form>
      </Card>
      <div style={{ marginTop: 10 }}>
        <Button style={{ float: 'right' }}>Save</Button>
      </div>
    </>
  );
}

export default AddEditEmployees;
