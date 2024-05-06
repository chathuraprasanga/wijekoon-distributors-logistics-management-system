import { Grid, Card, Table, Text, Badge, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewWarehouse() {
  const elements = [
    {
      id: 'KSL-15',
      name: 'Keshara Super Lime',
      size: '15KG',
      price: '550.00',
      quantity: '400',
    },
    {
      id: 'KSL-20',
      name: 'Keshara Super Lime',
      size: '20KG',
      price: '620.00',
      quantity: '500',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.id}>
        <Table.Td width="20%">{element.id}</Table.Td>
        <Table.Td width="35%">{element.name}</Table.Td>
        <Table.Td width="15%">{element.size}</Table.Td>
        <Table.Td width="15%">{element.price}</Table.Td>
        <Table.Td width="15%">{element.quantity}</Table.Td>
      </Table.Tr>
    </>
  ));

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
                View Warehouse
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Warehouse Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Warehouse ID:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">WDW-01</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Products:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">05</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    City:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">Mawathagama</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Quantity:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">1500</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Address:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">BOI Junction, Kandy rd</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Status:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">
                    <Badge size="sm" radius="sm" color="green">
                      ACTIVE
                    </Badge>
                  </Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text fw="bold">Stock Details</Text>
              <div>
                <Link to="/admin/assets/warehouses/stock-receive">
                  <Button size="xs">Stock Receive</Button>
                </Link>
                <Link to="/admin/assets/warehouses/stock-dispatch">
                  <Button size="xs" ml={10}>
                    Stock Disptach
                  </Button>
                </Link>
              </div>
            </div>

            <Table mt={10} withColumnBorders withRowBorders withTableBorder>
              <Table.Tr>
                <Table.Th>Product Code</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Product Price</Table.Th>
                <Table.Th>Product Quantity</Table.Th>
              </Table.Tr>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <div>
            <Link to="/admin/assets/warehouses/add-edit-orders">
              <Button style={{ float: 'right' }}>Create Order</Button>
            </Link>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewWarehouse;