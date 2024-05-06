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
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddEditCustomers() {
  const handleSave = () => {
    Notifications.show({
      title: 'Successfull',
      message: 'Customer Created Succesfully',
      icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    });
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
                Add Customer
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
              <Table.Td>
                <TextInput label="Customer Name" withAsterisk placeholder="Enter Customer Name" />
              </Table.Td>
              <Table.Td>
                <Select
                  label="Customer Type"
                  placeholder="Selet Customer Type"
                  data={['Hardware Store', 'Individual Customer']}
                  defaultValue="Hardware Store"
                  withAsterisk
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput label="Customer Email" withAsterisk placeholder="Enter Customer Email" />
              </Table.Td>
              <Table.Td>
                <TextInput label="Hardware Name" withAsterisk placeholder="Enter Hardware Name" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Customer Phone 01"
                  withAsterisk
                  placeholder="Enter Customer Primary Phone"
                />
              </Table.Td>
              <Table.Td>
                <TextInput label="Customer Phone 01" placeholder="Enter Customer Secondary Phone" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Customer Address: Street 01"
                  withAsterisk
                  placeholder="Enter Street 01"
                />
              </Table.Td>
              <Table.Td>
                <TextInput label="Street 02" placeholder="Enter Street 02" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput label="City" withAsterisk placeholder="Enter Citty" />
              </Table.Td>
              <Table.Td>
                <Select
                  label="District"
                  placeholder="Selet a District"
                  data={['Kurunegala', 'Puttalama']}
                  withAsterisk
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <Textarea size="md" label="Notes" placeholder="Input placeholder" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Switch
                  defaultChecked
                  color="violet"
                  labelPosition="left"
                  label="Status "
                  size="md"
                  radius="lg"
                />
              </Table.Td>
              <Table.Td style={{ display: 'flex', float: 'right' }}>
                <Link to="/admin/customers">
                  <Button
                    style={{ width: 100 }}
                    variant="filled"
                    color="violet"
                    size="sm"
                    onClick={handleSave}
                    type="submit"
                  >
                    Save
                  </Button>
                </Link>
              </Table.Td>
            </Table.Tr>
          </Table>
        </form>
      </Card>
    </>
  );
}

export default AddEditCustomers;
