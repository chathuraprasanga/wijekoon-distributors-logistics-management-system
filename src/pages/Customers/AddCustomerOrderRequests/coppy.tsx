import React, { useEffect, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCalendar, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { RootState } from '@/redux/store';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import {
  createCustomerOrderRequest,
  fetchCustomerOrderRequests,
  setCustomer,
  updateCustomerOrderRequest,
} from '@/redux/slices/customerSlice';

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

function AddEditCustomerOrderRequests() {
  const [value, setValue] = useState<Date | null>(null);
  const [rows, setRows] = useState<RowData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.customers.status);
  const error = useSelector((state: RootState) => state.customers.error);
  const customer = useSelector((state: RootState) => state.customers.customer);
  const products = useSelector((state: RootState) => state.suppliers.products);
  const selectedCustomerOrderRequest = useSelector(
    (state: RootState) => state.customers.customerOrderRequest
  );

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
        lineTotal: (0).toFixed(2), // Set initial line total to 0.0
      },
    ]);
  };

  const calculateTotal = (field: keyof RowData) =>
    rows.reduce((acc, row) => acc + parseFloat(row[field] || '0'), 0);

  const customerOrderRequestAddEditForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      customer: customer ? customer?._id : '',
      orderId: selectedCustomerOrderRequest?.orderId || '',
      expectedDate: selectedCustomerOrderRequest?.expectedDate || new Date(),
      order: [
        {
          product: '',
          quantity: '',
          discount: '',
          tax: '',
          lineTotal: '',
        },
      ],
      subTotal: calculateTotal('lineTotal').toFixed(2),
      totalDiscount: calculateTotal('discount').toFixed(2),
      totalTax: calculateTotal('tax').toFixed(2),
      netTotal: calculateTotal('lineTotal').toFixed(2),
      status: selectedCustomerOrderRequest?.status || '',
    },
    validate: {
      customer: isNotEmpty('Customer is Required'),
      expectedDate: isNotEmpty('Expected date is required'),
      netTotal: isNotEmpty('Grand total is required'),
    },
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
          ).toFixed(2);
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSave = async () => {
    try {
      const isValid = await customerOrderRequestAddEditForm.validate();
      if (!isValid) {
        return;
      }

      const formData = customerOrderRequestAddEditForm.values;
      formData.customer = customer?._id;
      formData.expectedDate = value;
      formData.status = 'CONFIRMED';
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('discount').toFixed(2);
      formData.totalTax = calculateTotal('tax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);

      await dispatch(createCustomerOrderRequest(formData)).unwrap();

      Notifications.show({
        title: 'Successful',
        message: 'Customer order request created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      customerOrderRequestAddEditForm.reset();
      dispatch(setCustomer(null));
      dispatch(fetchCustomerOrderRequests());
      navigate('/admin/customers/order-requests');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer order request',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = customerOrderRequestAddEditForm.values;
      formData.expectedDate = value || selectedCustomerOrderRequest.expectedDate;
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('discount').toFixed(2);
      formData.totalTax = calculateTotal('tax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);

      const payload = { ...formData, id: selectedCustomerOrderRequest?._id };
      console.log('PAYLOAD', payload);

      await dispatch(updateCustomerOrderRequest(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer order request updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      dispatch(fetchCustomerOrderRequests());
      navigate('/admin/customers/order-requests'); // navigate to the order requests list after updating
    } catch (e) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the customer order request',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    if (selectedCustomerOrderRequest) {
      customerOrderRequestAddEditForm.setValues({
        customer: selectedCustomerOrderRequest.customer?._id,
        orderId: selectedCustomerOrderRequest.orderId,
        expectedDate: new Date(selectedCustomerOrderRequest.expectedDate),
        order: selectedCustomerOrderRequest.order?.map((item) => ({
          product: item.product?._id,
          quantity: item.quantity?.toString(),
          discount: item.lineDiscount?.toString(),
          tax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
        })),
        subTotal: selectedCustomerOrderRequest.subTotal.toString(),
        totalDiscount: selectedCustomerOrderRequest.totalDiscount.toString(),
        totalTax: selectedCustomerOrderRequest.totalTax.toString(),
        netTotal: selectedCustomerOrderRequest.netTotal.toString(),
        status: selectedCustomerOrderRequest.status,
      });
      setRows(
        selectedCustomerOrderRequest.order?.map((item) => ({
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
  }, [selectedCustomerOrderRequest]);

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
                Add Customer Order Request
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <form
          action=""
          style={{ width: '100%' }}
          onSubmit={
            !selectedCustomerOrderRequest
              ? customerOrderRequestAddEditForm.onSubmit((values) => handleSave())
              : customerOrderRequestAddEditForm.onSubmit((values) => handleUpdate())
          }
        >
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
                  <Table.Td>{customer?.fullName}</Table.Td>
                  {!selectedCustomerOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Expected Date:
                      </Table.Td>
                      <Table.Td width={350}>
                        <DatePickerInput
                          rightSection={<IconCalendar />}
                          size="xs"
                          placeholder="Pick expected date"
                          value={value}
                          onChange={setValue}
                        />
                      </Table.Td>
                    </>
                  )}
                  {selectedCustomerOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Created Date:
                      </Table.Td>
                      <Table.Td>
                        {selectedCustomerOrderRequest?.createdAt?.split('T')[0] || 'N/A'}
                      </Table.Td>
                    </>
                  )}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td>
                    {customer?.phone} | {customer?.phoneSecondary}
                  </Table.Td>
                  {selectedCustomerOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Expected Date:
                      </Table.Td>
                      <Table.Td width={350}>
                        <DatePickerInput
                          rightSection={<IconCalendar />}
                          size="xs"
                          placeholder="Pick expected date"
                          value={
                            value ||
                            (selectedCustomerOrderRequest?.expectedDate
                              ? new Date(selectedCustomerOrderRequest.expectedDate)
                              : null)
                          }
                          onChange={(date) => setValue(date)}
                        />
                      </Table.Td>
                    </>
                  )}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td>{customer?.email}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td>{customer?.address}</Table.Td>
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
                     Sub total:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('lineTotal').toFixed(2)}
                    </Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      Total Discount:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('discount').toFixed(2)}
                    </Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      Total Tax:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('tax').toFixed(2)}
                    </Text>
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
                      {calculateTotal('lineTotal').toFixed(2)}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table>
            </Card>
            <div>
              <Button
                style={{ width: '15%', marginTop: 10, float: 'right' }}
                onClick={selectedCustomerOrderRequest ? handleUpdate : handleSave}
              >
                {selectedCustomerOrderRequest ? 'Update Order' : 'Save Order'}
              </Button>
            </div>
          </Grid.Col>
        </form>
      </Grid>
    </>
  );
}

export default AddEditCustomerOrderRequests;
