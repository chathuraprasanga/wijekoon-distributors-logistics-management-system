import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Select,
  Table,
  Text,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createWarehouse, fetchWarehouses } from '@/redux/slices/assetsSlice';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';

interface RowData {
  product: string;
  quantity: string;
}

function AddEditWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedWarehouse = useSelector((state: RootState) => state.assets.warehouse);
  const products = useSelector((state: RootState) => state.suppliers.products);
  const [rows, setRows] = useState<RowData[]>(selectedWarehouse?.stockDetails || []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addWarehouseForm = useForm({
    initialValues: {
      city: selectedWarehouse?.city || '',
      address: selectedWarehouse?.address || '',
      status: selectedWarehouse?.status || 'ACTIVE',
      stockDetails: rows,
    },
    validate: {
      city: isNotEmpty('City is required'),
      address: isNotEmpty('Address is required'),
    },
  });

  useEffect(() => {
    if (selectedWarehouse) {
      addWarehouseForm.setFieldValue('city', selectedWarehouse.city || '');
      addWarehouseForm.setFieldValue('address', selectedWarehouse.address || '');
    }
  }, [selectedWarehouse]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        product: '',
        quantity: '',
      },
    ]);
  };

  const removeRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleProductChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].product = value;
    setRows(newRows);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].quantity = value;
    setRows(newRows);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...addWarehouseForm.values,
        stockDetails: rows,
      };
      await dispatch(createWarehouse(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Warehouse created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      addWarehouseForm.reset(); // Reset the form state
      dispatch(fetchWarehouses());
      navigate('/admin/assets/warehouses');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the warehouse',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...addWarehouseForm.values,
        stockDetails: rows,
      };
      console.log(payload);
      // Add your update logic here
    } catch (e: any) {
      console.error(e);
    }
  };

  //  update is not working
  //   useEffect(() => {
  //     if (selectedWarehouse) {
  //       addWarehouseForm.setValues({
  //         city: selectedWarehouse.city || '',
  //         address: selectedWarehouse.address || '',
  //         status: selectedWarehouse.status || 'ACTIVE',
  //         stockDetails: selectedWarehouse.stockDetails || [],
  //       });
  //     }
  //   }, [selectedWarehouse]);

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
                {selectedWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <form onSubmit={addWarehouseForm.onSubmit(selectedWarehouse ? handleUpdate : handleSave)}>
        <Grid>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width="50%">
                    <TextInput
                      label="City"
                      withAsterisk
                      placeholder="Enter Warehouse City"
                      {...addWarehouseForm.getInputProps('city')}
                    />
                  </Table.Td>
                  <Table.Td width="50%"></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="50%" colSpan={2}>
                    <Textarea
                      label="Address"
                      withAsterisk
                      placeholder="Enter Warehouse Address"
                      {...addWarehouseForm.getInputProps('address')}
                    />
                  </Table.Td>
                </Table.Tr>
                {!selectedWarehouse && (
                  <Table.Tr>
                    <Table.Td colSpan={2}>
                      <Text>Initial Quantities</Text>
                      <Table withColumnBorders withRowBorders withTableBorder>
                        <Table.Tr>
                          <Table.Th>Product</Table.Th>
                          <Table.Th>Quantity</Table.Th>
                          <Table.Th></Table.Th>
                        </Table.Tr>
                        {rows.map((row, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>
                              <Select
                                value={row.product}
                                onChange={(value) => handleProductChange(index, value)}
                                data={products.map((product) => ({
                                  value: product._id,
                                  label: product.code,
                                }))} // Replace with actual product data
                              />
                            </Table.Td>
                            <Table.Td>
                              <TextInput
                                value={row.quantity}
                                onChange={(event) =>
                                  handleQuantityChange(index, event.currentTarget.value)
                                }
                              />
                            </Table.Td>
                            <Table.Td>
                              <ActionIcon
                                variant="light"
                                color="red"
                                onClick={() => removeRow(index)}
                              >
                                <IconTrash />
                              </ActionIcon>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                        <Table.Tr>
                          <Table.Td>
                            <Button onClick={addRow}>Add Product</Button>
                          </Table.Td>
                          <Table.Td colSpan={2}></Table.Td>
                        </Table.Tr>
                      </Table>
                    </Table.Td>
                  </Table.Tr>
                )}

                <Table.Tr>
                  {/* <Table.Td>
                    <>
                      <Select
                        color="violet"
                        size="xs"
                        radius="sm"
                        data={['ACTIVE', 'DEACTIVE']}
                        {...addWarehouseForm.getInputProps('status')}
                      />
                    </>
                  </Table.Td> */}
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <div>
              <Button style={{ float: 'right' }} type="submit">
                Save
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default AddEditWarehouse;
