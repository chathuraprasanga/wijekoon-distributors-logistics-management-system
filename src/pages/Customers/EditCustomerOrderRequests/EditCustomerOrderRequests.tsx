import { ActionIcon, Button, Card, Grid, Table, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCalendar, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EditCustomerOrderRequests() {
  const [value, setValue] = useState<Date | null>(null);

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
                Edit Customer Order Request
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }} size="lg">
              Customer Details
            </Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width="35%">Chathura Prasanga</Table.Td>
                <Table.Td style={{ fontWeight: 'bold' }} width="15%">
                  Created Date:
                </Table.Td>
                <Table.Td width="35%">
                  01/04/2024
                  {/* <DatePickerInput
                    defaultValue={new Date()}
                    clearable
                    rightSection={<IconCalendar />}
                    size="xs"
                    placeholder="Pick expected date"
                    value={value}
                    onChange={setValue}
                  /> */}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td>077 9250108</Table.Td>
                <Table.Td style={{ fontWeight: 'bold' }}>Expected Date:</Table.Td>
                <Table.Td>
                  <DatePickerInput
                    // clearable
                    size="xs"
                    defaultValue={new Date()}
                    placeholder="Pick date"
                    rightSection={<IconCalendar />}
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Email:
                </Table.Td>
                <Table.Td>chathuraprasanga98@gmail.com</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td>Godawele Watta, Kotikapola, Mawathagama</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withTableBorder withColumnBorders>
              <Table.Tr>
                <Table.Th>Product Code</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Discount</Table.Th>
                <Table.Th>Line Total</Table.Th>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <TextInput size="xs" placeholder="KSL-20" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Super Lime" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="20KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" value={300} />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter discount" rightSection="%" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="165000.00" disabled />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput size="xs" placeholder="KTM-30" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Tile Master" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="30KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="1500.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" value={100} />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter discount" rightSection="%" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="150000.00" disabled />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput size="xs" placeholder="KTM-30" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Skim Coat" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="25KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="1100.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" value={400} />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter discount" rightSection="%" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="440000.00" disabled />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput size="xs" placeholder="kDF-30" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Dollamite Fertilitzer" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="30KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="600.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" value={100} />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter discount" rightSection="%" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="60000.00" disabled />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <Button size="xs" style={{ width: '100%' }}>
                    Add Products
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Sub Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="815000.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Tax:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="0.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Discount:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="0.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Net Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="815000.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button style={{ float: 'right' }}>Update</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default EditCustomerOrderRequests;
