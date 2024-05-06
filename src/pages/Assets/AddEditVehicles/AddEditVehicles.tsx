import { Button, Card, Grid, Select, Switch, Table, Text, TextInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddEditVehicles() {
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
                Add Vehicle
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

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
                  />
                </Table.Td>
                <Table.Td width="50%">
                  <Select
                    label="Vehicle Type"
                    withAsterisk
                    placeholder="Select Vehicle Type"
                    data={['Lorry', 'Car', 'Bike']}
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="50%">
                  <TextInput label="Vehicle Brand" withAsterisk placeholder="Enter Vehicle Brand" />
                </Table.Td>
                <Table.Td width="50%">
                  <TextInput
                    label="Vehicle Capacity"
                    withAsterisk
                    placeholder="Enter Vehicle Capacity"
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <Switch
                    defaultChecked
                    color="grape"
                    labelPosition="left"
                    label="Status"
                    size="md"
                  />
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            <Button style={{ float: 'right' }}>Save</Button>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddEditVehicles;
