import { RootState } from '@/redux/store';
import { Grid, Card, Table, Text, Badge, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewWarehouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedWarehouse = useSelector((state: RootState) => state.assets.warehouse);
  const error = useSelector((state: RootState) => state.assets.error);
  const status = useSelector((state: RootState) => state.assets.status);

  console.log(selectedWarehouse);
  const stockDetails = selectedWarehouse?.stockDetails;

  const rows = stockDetails?.map((item) => (
    <>
      <Table.Tr key={item?._id}>
        <Table.Td width="20%">{item.product.code}</Table.Td>
        <Table.Td width="35%">{item.product.name}</Table.Td>
        <Table.Td width="15%">{item.product.size} KG</Table.Td>
        <Table.Td width="15%">{item.product.sellingPrice}</Table.Td>
        <Table.Td width="15%">{item.quantity}</Table.Td>
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
                  <Text size="sm">{selectedWarehouse?.warehouseId}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Products:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{selectedWarehouse?.stockDetails?.length}</Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    City:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{selectedWarehouse.city}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Quantity:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">
                    {selectedWarehouse?.stockDetails?.reduce(
                      (total: any, product: any) => total + product.quantity,
                      0
                    )}
                  </Text>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Address:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">{selectedWarehouse?.address}</Text>
                </Table.Td>
                <Table.Td width="15%">
                  <Text size="sm" fw="bold">
                    Status:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">
                    <Badge size="sm" radius="sm" color="green">
                      {selectedWarehouse?.status}
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
