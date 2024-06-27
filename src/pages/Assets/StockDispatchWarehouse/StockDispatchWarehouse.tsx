import { Grid, Card, Table, Select, ActionIcon, Button, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StockDispatchWarehouse() {
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
                Stock Dispatch
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Trip Details</Text>
            <Table withRowBorders={false} mt={10}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Trip Date:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <DatePickerInput
                    placeholder="Select Trip Date"
                    defaultValue={new Date()}
                    onChange={setValue}
                  />
                </Table.Td>
                <Table.Td width="15%">
                  <Text fw="bold" size="sm">
                    Trip ID:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Select size="sm" placeholder="Select Trip ID" data={['WDT-100', 'WDT-102']} />
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Stock Dispatch Details</Text>
            <Table withRowBorders withColumnBorders withTableBorder mt={10}>
              <Table.Tr>
                <Table.Th>Product ID</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Product Price</Table.Th>
                <Table.Th>Product Quantity</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%">
                  <Select
                    size="xs"
                    placeholder="Select a Value"
                    data={['KSL-15', 'KSL-20', 'KSC-25', 'KTM-30']}
                    defaultValue="KSC-25"
                  />
                </Table.Td>
                <Table.Td width="20%">Keshara Skim Coat</Table.Td>
                <Table.Td width="15%">25KG</Table.Td>
                <Table.Td width="20%">1150.00</Table.Td>
                <Table.Td width="20%">375</Table.Td>
                <Table.Td width="5%">
                  <ActionIcon color="red" variant="light">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="20%" colSpan={3}>
                  <Button size="xs" style={{ width: '35%' }}>
                    Add Product
                  </Button>
                </Table.Td>
                <Table.Td>Total Quantity: </Table.Td>
                <Table.Td>375</Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Button style={{ float: 'right' }}>Dispatch Stock</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default StockDispatchWarehouse;
