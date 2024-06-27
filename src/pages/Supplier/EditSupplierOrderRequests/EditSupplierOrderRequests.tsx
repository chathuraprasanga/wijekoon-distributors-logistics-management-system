import { Grid, Card, Table, Select, Button, TextInput, Text, ActionIcon } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCalendar, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EditSupplierOrderRequests() {
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
                Edit Supplier Order Request
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }} size="lg">
              Supplier Details
            </Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width="35%">Keshara Minerals and Chemicals</Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" style={{ fontWeight: 'bold' }}>
                    {' '}
                    Created Date:{' '}
                  </Text>{' '}
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">01/04/2024</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width="35%">077 9250108 / 0750940340</Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" style={{ fontWeight: 'bold' }}>
                    Expected Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <DatePickerInput
                    rightSection={<IconCalendar />}
                    size="xs"
                    placeholder="Pick expected date"
                    value={value}
                    onChange={setValue}
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Email:
                </Table.Td>
                <Table.Td width="35%">kesharac@gmail.com</Table.Td>
                <Table.Td width="15%">
                  {' '}
                  <Text size="sm" style={{ fontWeight: 'bold' }}>
                    Purpose:{' '}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Select
                    placeholder="Select Purpose"
                    size="xs"
                    data={['For Delivery', 'For Warehouse']}
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td>BoI, Kandy</Table.Td>
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
                <Table.Th>Quantity</Table.Th>
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
                  <TextInput size="xs" placeholder="Enter Quantity" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
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
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>
                  <Text size="sm">Total Quantity</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>
                  <Text size="sm">Total Size</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="" disabled />
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

export default EditSupplierOrderRequests;
