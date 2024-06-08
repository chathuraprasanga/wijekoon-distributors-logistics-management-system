import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput, rem } from '@mantine/core';
import { IconArrowLeft, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';
import {
  createCustomerOrder,
  fetchCustomerOrderRequests,
  fetchCustomerOrders,
  setCustomer,
  setCustomerPayment,
} from '@/redux/slices/customerSlice';

import PaymentModal from './PaymentModal/PaymentModal';

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
}

function AddCustomerOrders() {
  const [value, setValue] = useState<Date | null>(null);
  const [rows, setRows] = useState<RowData[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.customers.status);
  const error = useSelector((state: RootState) => state.customers.error);
  const products = useSelector((state: RootState) => state.suppliers.products);
  const selectedRequest = useSelector((state: RootState) => state.customers.customerOrderRequest);
  const [opened, { open, close }] = useDisclosure(false);
  const paymentData = useSelector((state: RootState) => state.customers.customerPayment);

  useEffect(() => {
    dispatch(fetchProducts());
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
      },
    ]);
  };

  const calculateTotal = (field: keyof RowData) =>
    rows?.reduce((acc, row) => acc + parseFloat(row[field] || '0'), 0);

  const customerOrderAddForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      orderId: selectedRequest.orderId,
      customerOrderRequest: selectedRequest?._id,
      order: [
        {
          product: '',
          quantity: '',
          discount: '',
          tax: '',
          lineTotal: '',
        },
      ],
      subTotal: calculateTotal('lineTotal')?.toFixed(2),
      totalDiscount: calculateTotal('discount')?.toFixed(2),
      totalTax: calculateTotal('tax')?.toFixed(2),
      netTotal: calculateTotal('lineTotal')?.toFixed(2),
      status: 'NOT PAID' || '',
      paymentData: {
        totalPayable: '',
        paymentDetails: [],
        outstanding: '',
        status: '',
      },
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
              unitPrice: product.sellingPrice,
              lineTotal: (0).toFixed(2), // Set initial line total to 0.0
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
          const quantity = parseFloat(updatedRow.quantity) || 0;
          const discount = parseFloat(updatedRow.discount) || 0;
          const tax = parseFloat(updatedRow.tax) || 0;
          updatedRow.lineTotal = (
            unitPrice *
            quantity *
            (1 - discount / 100) *
            (1 + tax / 100)
          )?.toFixed(2);
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    if (selectedRequest) {
      customerOrderAddForm.setValues({
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
          unitPrice: item.product.sellingPrice?.toString(),
          quantity: item.quantity?.toString(),
          discount: item.lineDiscount?.toString(),
          tax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
        }))
      );
    }
  }, [selectedRequest]);

  const handleSave = async () => {
    try {
      const isValid = await customerOrderAddForm.validate();
      if (!isValid) {
        return;
      }

      const formData = customerOrderAddForm.values;
      formData.orderId = selectedRequest.orderId;
      formData.customerOrderRequest = selectedRequest._id;
      formData.status = paymentData.status;
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('discount').toFixed(2);
      formData.totalTax = calculateTotal('tax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);
      formData.paymentData = paymentData;

      await dispatch(createCustomerOrder(formData)).unwrap();

      Notifications.show({
        title: 'Successful',
        message: 'Customer order created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      customerOrderAddForm.reset();
      dispatch(setCustomer(null));
      dispatch(setCustomerPayment(null));
      dispatch(fetchCustomerOrders());
      navigate('/admin/customers/orders');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer order',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  return (
    <>
      <PaymentModal
        opened={opened}
        onClose={close}
        customerPayment={paymentData}
        totalPayable={calculateTotal('lineTotal')}
      />
      <form onSubmit={() => customerOrderAddForm.onSubmit(handleSave)}>
        <Grid>
          <Grid.Col span={12}>
            <div>
              <div style={{ display: 'flex' }}>
                <Link to={-1}>
                  <IconArrowLeft />
                </Link>
                <Text size="md" style={{ fontWeight: 'bold' }}>
                  Create Customer Order
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
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Name:
                  </Table.Td>
                  <Table.Td>Chathura Prasanga</Table.Td>
                  <Table.Td>
                    {/* <DatePickerInput
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
                  <Table.Td colSpan={6}></Table.Td>
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
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button style={{ float: 'right' }} onClick={!paymentData ? () => open() : handleSave}>
              {!paymentData ? 'Go to Payments' : 'Save'}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default AddCustomerOrders;
