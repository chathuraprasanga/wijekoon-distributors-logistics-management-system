import React, { useEffect, useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { ActionIcon, Button, Card, Grid, Select, Table, Text, TextInput, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCalendar, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { RootState } from '@/redux/store';
import {
  createSupplierOrderRequest,
  fetchSupplierOrderRequests,
  setSupplier,
  updateSupplierOrderRequest,
  fetchProducts,
} from '@/redux/slices/supplierSlice';

interface RowData {
  product: string;
  productCode: string;
  productName: string;
  productSize: string;
  unitPrice: string;
  quantity: string;
  lineDiscount: string;
  lineTax: string;
  lineTotal: string;
  lineSize: string;
}

function AddEditSupplierOrderRequests() {
  const [value, setValue] = useState<Date | null>(null);
  const [purpose, setPurpose] = useState('');
  const [rows, setRows] = useState<RowData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.suppliers.status);
  const error = useSelector((state: RootState) => state.suppliers.error);
  const supplier = useSelector((state: RootState) => state.suppliers.supplier);
  const products = useSelector((state: RootState) => state.suppliers.products);
  const selectedSupplierOrderRequest = useSelector(
    (state: RootState) => state.suppliers.supplierOrderRequest
  );
  console.log(purpose);

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
        lineDiscount: '',
        lineTax: '',
        lineTotal: (0).toFixed(2), // Set initial line total to 0.0
        lineSize: (0).toFixed(2),
      },
    ]);
  };

  const calculateTotal = (field: keyof RowData) =>
    rows.reduce((acc, row) => acc + parseFloat(row[field] || '0'), 0);

  const supplierOrderRequestAddEditForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      supplier: supplier ? supplier?._id : '',
      orderId: selectedSupplierOrderRequest?.orderId || '',
      expectedDate: selectedSupplierOrderRequest?.expectedDate || new Date(),
      purpose: selectedSupplierOrderRequest?.purpose || '',
      order: [
        {
          product: '',
          quantity: '',
          lineDiscount: '',
          lineTax: '',
          lineTotal: '',
          lineSize: '',
        },
      ],
      subTotal: calculateTotal('lineTotal').toFixed(2),
      totalDiscount: calculateTotal('lineDiscount').toFixed(2),
      totalTax: calculateTotal('lineTax').toFixed(2),
      netTotal: calculateTotal('lineTotal').toFixed(2),
      totalQuantity: calculateTotal('quantity'),
      totalSize: calculateTotal('lineSize').toFixed(2),
      status: selectedSupplierOrderRequest?.status || '',
    },
    validate: {
      supplier: isNotEmpty('Supplier is Required'),
      expectedDate: isNotEmpty('Expected date is required'),
      purpose: isNotEmpty('Purpose is required'),
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
        if (field === 'quantity' || field === 'lineDiscount' || field === 'lineTax') {
          const unitPrice = parseFloat(updatedRow.unitPrice) || 0;
          const size = parseFloat(updatedRow.productSize) || 0;
          const quantity = parseFloat(updatedRow.quantity) || 0;
          const discount = parseFloat(updatedRow.lineDiscount) || 0;
          const tax = parseFloat(updatedRow.lineTax) || 0;
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

  const handleSave = async () => {
    try {
      const formData = supplierOrderRequestAddEditForm.values;
      formData.supplier = supplier?._id;
      formData.expectedDate = value;
      formData.purpose = purpose;
      formData.status = 'PENDING';
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('lineDiscount').toFixed(2);
      formData.totalTax = calculateTotal('lineTax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalQuantity = calculateTotal('quantity');
      formData.totalSize = calculateTotal('lineSize').toFixed(2);

      const isValid = await supplierOrderRequestAddEditForm.validate();
      if (!isValid) {
        return;
      }

      await dispatch(createSupplierOrderRequest(formData)).unwrap();

      Notifications.show({
        title: 'Successful',
        message: 'Supplier order request created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      supplierOrderRequestAddEditForm.reset();
      dispatch(setSupplier(null));
      dispatch(fetchSupplierOrderRequests());
      navigate('/admin/Suppliers/order-requests');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the Supplier order request',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = supplierOrderRequestAddEditForm.values;
      formData.expectedDate = value || selectedSupplierOrderRequest.expectedDate;
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('lineDiscount').toFixed(2);
      formData.totalTax = calculateTotal('lineTax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalSize = calculateTotal('lineSize').toFixed(2);
      formData.totalQuantity = calculateTotal('quantity');

      const payload = { ...formData, id: selectedSupplierOrderRequest?._id };
      console.log('PAYLOAD', payload);

      await dispatch(updateSupplierOrderRequest(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Supplier order request updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      dispatch(fetchSupplierOrderRequests());
      navigate('/admin/Suppliers/order-requests'); // navigate to the order requests list after updating
    } catch (e) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Supplier order request',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    if (selectedSupplierOrderRequest) {
      supplierOrderRequestAddEditForm.setValues({
        supplier: selectedSupplierOrderRequest.supplier?._id,
        orderId: selectedSupplierOrderRequest.orderId,
        expectedDate: new Date(selectedSupplierOrderRequest.expectedDate),
        order: selectedSupplierOrderRequest.order?.map((item) => ({
          product: item.product?._id,
          quantity: item.quantity?.toString(),
          lineDiscount: item.lineDiscount?.toString(),
          lineTax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
          lineSize: item.lineSize?.toString(),
        })),
        subTotal: selectedSupplierOrderRequest.subTotal?.toString(),
        totalDiscount: selectedSupplierOrderRequest.totalDiscount?.toString(),
        totalTax: selectedSupplierOrderRequest.totalTax?.toString(),
        netTotal: selectedSupplierOrderRequest.netTotal?.toString(),
        // totalSize: selectedSupplierOrderRequest?.totalSize?.tostring(),
        status: selectedSupplierOrderRequest?.status,
      });
      setRows(
        selectedSupplierOrderRequest.order?.map((item) => ({
          product: item.product?._id,
          productCode: item.product.code,
          productName: item.product.name,
          productSize: item.product.size?.toString(),
          unitPrice: item.product.sellingPrice?.toString(),
          quantity: item.quantity?.toString(),
          lineDiscount: item.lineDiscount?.toString(),
          lineTax: item.lineTax?.toString(),
          lineTotal: item.lineTotal?.toString(),
          lineSize: item.lineSize?.toString(),
        }))
      );
    }
  }, [selectedSupplierOrderRequest]);

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
                Add Supplier Order Request
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <form
          action=""
          style={{ width: '100%' }}
          onSubmit={
            !selectedSupplierOrderRequest
              ? supplierOrderRequestAddEditForm.onSubmit((values) => handleSave())
              : supplierOrderRequestAddEditForm.onSubmit((values) => handleUpdate())
          }
        >
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text style={{ fontWeight: 'bold' }} size="lg">
                Supplier Details
              </Text>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Name:
                  </Table.Td>
                  <Table.Td>{supplier?.name}</Table.Td>
                  {!selectedSupplierOrderRequest && (
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
                  {selectedSupplierOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Created Date:
                      </Table.Td>
                      <Table.Td>
                        {selectedSupplierOrderRequest?.createdAt?.split('T')[0] || 'N/A'}
                      </Table.Td>
                    </>
                  )}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td>
                    {supplier?.phone} | {supplier?.phoneSecondary}
                  </Table.Td>
                  {selectedSupplierOrderRequest && (
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
                            (selectedSupplierOrderRequest?.expectedDate
                              ? new Date(selectedSupplierOrderRequest.expectedDate)
                              : null)
                          }
                          onChange={(date) => setValue(date)}
                        />
                      </Table.Td>
                    </>
                  )}
                  {!selectedSupplierOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Purpose
                      </Table.Td>
                      <Table.Td>
                        <Select
                          size="xs"
                          placeholder="Select Purpose"
                          data={[
                            { value: 'delivery', label: 'For Delivery' },
                            { value: 'warehouse', label: 'For Warehouse' },
                          ]}
                          value={purpose}
                          onChange={(value: any) => setPurpose(value)}
                        />
                      </Table.Td>
                    </>
                  )}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td>{supplier?.email}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td>{supplier?.address}</Table.Td>
                  {selectedSupplierOrderRequest && (
                    <>
                      <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                        Pupose
                      </Table.Td>
                      <Table.Td style={{ textTransform: 'capitalize' }}>
                        {selectedSupplierOrderRequest?.purpose}
                      </Table.Td>
                    </>
                  )}
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
                  {selectedSupplierOrderRequest && <Table.Th>Discount</Table.Th>}
                  {selectedSupplierOrderRequest && <Table.Th>Tax</Table.Th>}
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
                    {selectedSupplierOrderRequest && (
                      <Table.Td>
                        <TextInput
                          size="xs"
                          placeholder="Enter discount"
                          rightSection="%"
                          disabled
                          value={row.lineDiscount}
                          onChange={(e) =>
                            handleChange(e.currentTarget.value, 'lineDiscount', index)
                          }
                        />
                      </Table.Td>
                    )}
                    {selectedSupplierOrderRequest && (
                      <Table.Td>
                        <TextInput
                          size="xs"
                          placeholder="Enter tax"
                          rightSection="%"
                          disabled
                          value={row.lineTax}
                          onChange={(e) => handleChange(e.currentTarget.value, 'lineTax', index)}
                        />
                      </Table.Td>
                    )}
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
                {/* <Table.Tr>
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
                </Table.Tr> */}
                {/* <Table.Tr>
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
                </Table.Tr> */}
                {/* <Table.Tr>
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
                </Table.Tr> */}
                <Table.Tr>
                  {selectedSupplierOrderRequest && <Table.Td colSpan={2}></Table.Td>}
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Total Quantity:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('quantity')}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      Total Size:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="md" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('lineSize').toFixed(2)} KG
                    </Text>
                  </Table.Td>
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
                onClick={selectedSupplierOrderRequest ? handleUpdate : handleSave}
              >
                {selectedSupplierOrderRequest ? 'Update Order' : 'Save Order'}
              </Button>
            </div>
          </Grid.Col>
        </form>
      </Grid>
    </>
  );
}

export default AddEditSupplierOrderRequests;
