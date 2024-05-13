import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddEditTrips() {
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
                Add Trip
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="md" style={{ fontWeight: 'bold' }}>
              Trip Details
            </Text>
            <Grid>
              <Grid.Col span={3}>
                <DateInput
                  value={value}
                  onChange={setValue}
                  label="Trip Date"
                  placeholder="Date input"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Select a Vehicle"
                  placeholder="Select a Vehicle"
                  data={['LC-3801 8500KG', 'LK 2604 7500KG', 'By Supplier']}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Select a Driver"
                  placeholder="Select a Driver"
                  //   disabled= {}
                  data={['Indika', 'Mahinda', 'By Supplier']}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label="Select a Warehouse"
                  placeholder="Select a Warehouse"
                  //   disabled= {}
                  data={['WDW-001 Mawathagama', 'WDW-002 Kurunegala', 'WDW-003 Barandana']}
                />
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Order Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Supplier Name:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">Keshara Minerals and Chemicals</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Phone:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">081 2536488 / 077 7123456</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Email:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">kesharaminerals@chem.com</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Address
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">BOI, Pallekelle, Kandy</Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
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
                  <TextInput size="xs" placeholder="Enter Quantity" value="300" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="20" rightSection="%" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="150000.00" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
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
                  <TextInput size="xs" placeholder="Enter Quantity" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" rightSection="%" placeholder="Enter Discount" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="150000.00" variant="filled" />
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
                  <Text size="sm">Total Size: </Text>
                </Table.Td>
                <Table.Td>5500KG</Table.Td>
                <Table.Td>
                  <Text size="sm">Sub Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="300000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>
                  <Text size="sm">Capacity: </Text>
                </Table.Td>
                <Table.Td>8500KG</Table.Td>
                <Table.Td>
                  <Text size="sm">Tax:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="0.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Discount:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="60000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Net Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="240000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
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

export default AddEditTrips;
