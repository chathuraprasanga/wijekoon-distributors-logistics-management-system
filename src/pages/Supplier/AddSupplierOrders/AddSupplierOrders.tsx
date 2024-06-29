import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput, rem } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  createSupplierOrder,
  fetchProducts,
  fetchSupplierOrders,
  setSupplier,
  setSupplierOrder,
  setSupplierPayment,
} from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';
import { fetchCheques } from '@/redux/slices/chequesSlice';
import { fetchDriverEmployees } from '@/redux/slices/employeeSlice';
import { fetchAllActiveLorries, setWarehouse } from '@/redux/slices/assetsSlice';
import SupplierPaymentModal from './paymentModal/supplierPaymentModal';

interface RowData {
  product: string;
  productCode: string;
  productName: string;
  productSize: string;
  unitPrice: string;
  quantity: string;
  discount: string;
  tax: string;
  lineTotal: string;
  lineSize: string;
}

function AddSupplierOrders() {
  const [optionSupplier, setOptionSupplier] = useState(false);
  const [optionWarehouse, setOptionWarehouse] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [value, setValue] = useState<Date | null>(null);
  const [rows, setRows] = useState<RowData[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [activePage, setPage] = useState(1);
  const status = useSelector((state: RootState) => state.suppliers.status);
  const error = useSelector((state: RootState) => state.suppliers.error);
  const products = useSelector((state: RootState) => state.suppliers.products);
  const selectedRequest = useSelector((state: RootState) => state.suppliers.supplierOrderRequest);
  const paymentData = useSelector((state: RootState) => state.suppliers.supplierPayment);
  const cheques = useSelector((state: RootState) => state.cheques.cheques);
  const drivers = useSelector((state: RootState) => state.employees.driverEmployees);
  const vehicles = useSelector((state: RootState) => state.assets.activeLorries);
  const payment = useSelector((state: RootState) => state.suppliers.supplierPayment);
  const warehouse = useSelector((state: RootState) => state.assets.warehouse);
  const [selectedDriver, setSelectedDriver] = useState('');
  // const payments = useSelector((state: RootState) => state.cheques.payments);
  // const payments = useSelector((state: RootState) => state.suppliers.supplierPayment);

  // useEffect(() => {
  //   if (payments?.lenght > 0) {
  //     open();
  //   }
  // }, [payments, dispatch]);

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

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCheques());
    dispatch(fetchDriverEmployees());
    dispatch(fetchAllActiveLorries());
    dispatch(setSupplierPayment(null));
    dispatch(setWarehouse(null));
  }, [dispatch]);

  const addRow = () => {
    dispatch(fetchProducts());
    setRows([
      ...rows,
      {
        product: '',
        productCode: '',
        productName: '',
        productSize: '',
        unitPrice: '',
        quantity: '',
        discount: '',
        tax: '',
        lineTotal: (0).toFixed(2),
        lineSize: (0).toFixed(2),
      },
    ]);
  };

  const calculateTotal = (field: keyof RowData) =>
    rows?.reduce((acc, row) => acc + parseFloat(row[field] || '0'), 0);

  const supplierOrderAddForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      orderId: selectedRequest.orderId,
      supplierOrderRequest: selectedRequest?._id,
      order: [
        {
          product: '',
          quantity: '',
          discount: '',
          tax: '',
          lineTotal: '',
        },
      ],
      tripDetails: {
        date: '',
        vehicle: '',
        driver: '',
      },
      subTotal: calculateTotal('lineTotal')?.toFixed(2),
      totalDiscount: calculateTotal('discount')?.toFixed(2),
      totalTax: calculateTotal('tax')?.toFixed(2),
      netTotal: calculateTotal('lineTotal')?.toFixed(2),
      totalSize: calculateTotal('lineSize').toFixed(2),
      totalQuantity: calculateTotal('quantity'),
      status: 'NOT PAID' || '',
      paymentDetails: {
        method: '',
        bank: '',
        branch: '',
        chequeNumber: '',
        depositDate: '',
        amount: '',
      },
      outstanding: '',
    },
    validate: {},
  });

  const removeRow = (index: number) => {
    setRows(rows.filter((row, rowIndex) => rowIndex !== index));
  };

  const handleProductChange = (code: string, index: number) => {
    const product = products.find((p) => p.code === code);
    if (product) {
      const updatedRows = rows?.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              product: product?._id,
              productCode: product.code,
              productName: product.name,
              productSize: product.size,
              unitPrice: product.buyingPrice,
              lineTotal: (0).toFixed(2), // Set initial line total to 0.0
              lineSize: (0).toFixed(2), // Set initial line total to 0.0
            }
          : row
      );
      setRows(updatedRows);
    }
  };

  const handleChange = (value: string, field: keyof RowData, index: number) => {
    const updatedRows = rows?.map((row, rowIndex) => {
      if (rowIndex === index) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'quantity' || field === 'discount' || field === 'tax') {
          const unitPrice = parseFloat(updatedRow.unitPrice) || 0;
          const size = parseFloat(updatedRow.productSize) || 0;
          const quantity = parseFloat(updatedRow.quantity) || 0;
          const discount = parseFloat(updatedRow.discount) || 0;
          const tax = parseFloat(updatedRow.tax) || 0;
          updatedRow.lineTotal = (
            unitPrice *
            quantity *
            (1 - discount / 100) *
            (1 + tax / 100)
          ).toFixed(2);
          updatedRow.lineSize = (quantity * size).toFixed(2);
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    if (selectedRequest) {
      supplierOrderAddForm.setValues({
        orderId: selectedRequest.orderId,
        order: selectedRequest.order?.map((item: any) => ({
          product: item.product?._id,
          quantity: item.quantity?.toString(),
          discount: item.lineDiscount?.toString(),
          tax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
        })),
        subTotal: selectedRequest.subTotal?.toString(),
        totalDiscount: selectedRequest.totalDiscount?.toString(),
        totalTax: selectedRequest.totalTax?.toString(),
        netTotal: selectedRequest.netTotal?.toString(),
        status: selectedRequest.status,
      });
      setRows(
        selectedRequest.order?.map((item: any) => ({
          product: item.product?._id,
          productCode: item.product.code,
          productName: item.product.name,
          productSize: item.product.size?.toString(),
          unitPrice: item.product.buyingPrice?.toString(),
          quantity: item.quantity?.toString(),
          discount: item.lineDiscount?.toString(),
          tax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
          lineSize: item.lineSize?.toString(),
        }))
      );
    }
  }, [selectedRequest]);

  const handleSave = async () => {
    try {
      const isValid = await supplierOrderAddForm.validate();
      if (!isValid) {
        return;
      }

      const formData = supplierOrderAddForm.values;
      formData.orderId = selectedRequest.orderId;
      formData.supplierOrderRequest = selectedRequest._id;
      formData.status = paymentData.status;
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('discount').toFixed(2);
      formData.totalTax = calculateTotal('tax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalQuantity = calculateTotal('quantity');
      formData.totalSize = calculateTotal('lineSize').toFixed(2);
      formData.paymentDetails = paymentData;
      formData.outstanding = paymentData.outstanding;
      formData.tripDetails = { date: value, vehicle: vehicle._id, driver: selectedDriver };

      await dispatch(createSupplierOrder(formData)).unwrap();

      Notifications.show({
        title: 'Successful',
        message: 'Customer order created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      supplierOrderAddForm.reset();
      dispatch(setSupplier(null));
      dispatch(setSupplierOrder(null));
      dispatch(fetchSupplierOrders());
      navigate('/admin/suppliers/orders');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer order',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleVehicleChange = (value) => {
    const selectedVehicleObj = vehicles.find((vehicle) => vehicle._id === value);
    setVehicle(selectedVehicleObj);
  };

  const handleDriverChange = (driverId) => {
    setSelectedDriver(driverId);
    supplierOrderAddForm.setFieldValue('tripDetails.driver', driverId);
  };

  return (
    <>
      <SupplierPaymentModal
        opened={opened}
        onClose={close}
        supplierPayment={paymentData}
        totalPayable={calculateTotal('lineTotal')}
      />

      <form action="">
        <Grid>
          <Grid.Col span={12}>
            <div>
              <div style={{ display: 'flex' }}>
                <Link to={-1}>
                  <IconArrowLeft />
                </Link>
                <Text size="md" style={{ fontWeight: 'bold' }}>
                  Add Supplier Order
                </Text>
              </div>
              <div></div>
            </div>
          </Grid.Col>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Trip Details
              </Text>
              <Grid>
                <Grid.Col span={4}>
                  <DateInput
                    size="xs"
                    // value={new Date()}
                    onChange={setValue}
                    label="Trip Date"
                    placeholder="Date input"
                    minDate={new Date()}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Select
                    size="xs"
                    label="Select a Vehicle"
                    placeholder="Select a Vehicle"
                    data={vehicles.map((vehicle) => ({
                      value: vehicle._id,
                      label: vehicle.number,
                    }))}
                    onChange={handleVehicleChange}
                    allowDeselect={false}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <Select
                    size="xs"
                    label="Select a Driver"
                    placeholder="Select a Driver"
                    //   disabled= {}
                    data={drivers.map((driver) => ({
                      value: driver._id,
                      label: driver.name,
                    }))}
                    allowDeselect={false}
                    onChange={handleDriverChange}
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
                  <Table.Th>Tax</Table.Th>
                  <Table.Th>Line Total</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
                {rows?.map((row, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Select
                        size="xs"
                        placeholder="Select Product"
                        data={products?.map((product) => ({
                          value: product.code,
                          label: product.code,
                        }))}
                        value={row.productCode}
                        onChange={(code) => handleProductChange(code, index)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput size="xs" value={row.productName} disabled />
                    </Table.Td>
                    <Table.Td>
                      <TextInput size="xs" value={row.productSize} disabled />
                    </Table.Td>
                    <Table.Td>
                      <TextInput size="xs" value={row.unitPrice} disabled />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        size="xs"
                        placeholder="Enter Quantity"
                        value={row.quantity}
                        defaultValue={0}
                        onChange={(e) => handleChange(e.currentTarget.value, 'quantity', index)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        size="xs"
                        placeholder="Enter discount"
                        rightSection="%"
                        value={row.discount}
                        onChange={(e) => handleChange(e.currentTarget.value, 'discount', index)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput
                        size="xs"
                        placeholder="Enter tax"
                        rightSection="%"
                        value={row.tax}
                        onChange={(e) => handleChange(e.currentTarget.value, 'tax', index)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput size="xs" value={row.lineTotal} disabled />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon variant="light" color="red" onClick={() => removeRow(index)}>
                        <IconTrash />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
                <Table.Tr>
                  <Table.Td colSpan={2}>
                    <Button size="xs" style={{ width: '100%' }} onClick={addRow}>
                      Add Products
                    </Button>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={4}></Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Total Quantity:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('quantity')?.toFixed(2)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Grand Total:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('lineTotal')?.toFixed(2)}
                    </Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={4}></Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Vehicle Capacity:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {vehicle?.capacity || 0.0} KG
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Total Size:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('lineSize')?.toFixed(2)} KG
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          {/* <Grid.Col span={12}>
            {optionSupplier && optionWarehouse && (
              <div style={{ float: 'right' }}>
                <Button ml={10} size="xs" color="violet" onClick={setOptionWarehouse(true)}>
                  Transfer to warehouse
                </Button>
                <Button ml={10} size="xs" onClick={setOptionSupplier(true)}>
                  Set Payment Details
                </Button>
              </div>
            )}
          </Grid.Col> */}
          <Grid.Col>
            {/* <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw="bold">Payment Details</Text>
              <Text>Enter Payment Details</Text>
              <Table withColumnBorders withTableBorder withRowBorders>
                <Table.Tr>
                  <Table.Th>Payment Method</Table.Th>
                  <Table.Th>Bank</Table.Th>
                  <Table.Th>Branch</Table.Th>
                  <Table.Th>Chq no.</Table.Th>
                  <Table.Th>Deposit Date</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%">
                    <Select
                      size="xs"
                      placeholder="Pick value"
                      data={[
                        { label: 'Cash', value: 'Cash' },
                        { label: 'Cheque', value: 'Cheque' },
                      ]}
                      defaultValue="Cash"
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput size="xs" placeholder="Bank code" />
                  </Table.Td>
                  <Table.Td>
                    <TextInput size="xs" placeholder="Branch code" />
                  </Table.Td>
                  <Table.Td>
                    <TextInput size="xs" placeholder="Chq Number" />
                  </Table.Td>
                  <Table.Td>
                    <DatePickerInput
                      size="xs"
                      placeholder="Deposit Date"
                      value={value}
                      onChange={setValue}
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput size="xs" placeholder="Input placeholder" />
                  </Table.Td>
                  <Table.Td width={50}>
                    <ActionIcon variant="light" color="red">
                      <IconTrash />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Button size="xs">New Payment Detail</Button>
                    <Button size="xs" ml={10} color="violet" onClick={open}>
                      Customer Cheque
                    </Button>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">Outstanding:</Text>
                  </Table.Td>
                  <Table.Td>
                    <TextInput size="xs" placeholder="" />
                  </Table.Td>
                  <Table.Td width={50}></Table.Td>
                </Table.Tr>
                <Table.Tr></Table.Tr>
              </Table>
            </Card> */}
            <Grid.Col>
              <div style={{ display: 'flex', float: 'right' }}>
                {!payment && (
                  <div>
                    <Button
                      size="sm"
                      mt={10}
                      mb={10}
                      color="violet"
                      disabled
                      // onClick={}
                    >
                      Set Warehouse
                    </Button>
                  </div>
                )}
                <Button
                  size="sm"
                  mt={10}
                  mb={10}
                  ml={10}
                  onClick={!paymentData ? () => open() : handleSave}
                >
                  {!payment && !warehouse ? 'Go To Payments' : 'Save'}
                </Button>
              </div>
            </Grid.Col>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default AddSupplierOrders;
