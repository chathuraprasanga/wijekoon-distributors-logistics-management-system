import { Grid, Card, Table, Text, Badge, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setWarehouse } from '@/redux/slices/assetsSlice';
import {
  setCustomer,
  setCustomerOrder,
  setCustomerOrderRequest,
  setCustomerPayment,
} from '@/redux/slices/customerSlice';
import { RootState } from '@/redux/store';
import { setTrip } from '@/redux/slices/tripsSlice';
import { hasAnyPrivilege, hasPrivilege } from '@/helpers/utils/permissionHandler';

function ViewWarehouse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedWarehouse = useSelector((state: RootState) => state.assets.warehouse);
  const error = useSelector((state: RootState) => state.assets.error);
  const status = useSelector((state: RootState) => state.assets.status);

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

  const handleCreateOrder = () => {
    dispatch(setCustomerOrder(null));
    dispatch(setCustomer(null));
    dispatch(setCustomerOrderRequest(null));
    dispatch(setWarehouse(selectedWarehouse));
    dispatch(setCustomerPayment(null));
    navigate('/admin/assets/warehouses/add-edit-orders');
  };

  const handleStockReceive = () => {
    dispatch(setTrip(null));
    navigate('/admin/assets/warehouses/stock-receive');
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
                {/* <Link to="/admin/assets/warehouses/stock-receive"> */}
                {hasPrivilege('EDIT_WAREHOUSES') && (
                  <Button size="xs" onClick={handleStockReceive}>
                    Stock Receive
                  </Button>
                )}
                {/* </Link> */}
                <Link to="/admin/assets/warehouses/stock-dispatch">
                  <Button size="xs" ml={10} disabled>
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
            {/* <Link to="/admin/assets/warehouses/add-edit-orders"> */}
            {hasAnyPrivilege(['ADD_CUSTOMER_ORDERS', 'EDIT_WAREHOUSES'])}
            <Button style={{ float: 'right' }} onClick={handleCreateOrder}>
              Create Order
            </Button>
            {/* </Link> */}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewWarehouse;
