import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';

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

interface modalRowData {
  paymentMethod: string;
  bank: string;
  branch: string;
  chequeNumber: string;
  depositDate: string;
  amount: string;
}

function AddCustomerOrders() {
  const [outstanding, setOutstanding] = useState('');
  const [paymentMethods, setPaymentMethods] = useState({});
  const [rows, setRows] = useState<RowData[]>([]);
  const [modalRows, setModalRows] = useState<modalRowData[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.suppliers.products);
  const selectedRequest = useSelector((state: RootState) => state.customers.customerOrderRequest);

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
        lineTotal: '',
      },
    ]);
  };

  const addModalRow = () => {
    if (parseFloat(outstanding) > 0) {
      const newRowId = Date.now();

      const newRow = {
        paymentMethod: 'Cheque',
        bank: '',
        branch: '',
        chequeNumber: '',
        depositDate: '',
        amount: '',
      };

      setModalRows([...modalRows, newRow]);

      setPaymentMethods((prev) => ({ ...prev, [newRowId]: 'Cash' }));
    } else {
      Notifications.show({
        title: 'Error',
        message: 'Cannot add new payment details as the outstanding balance is 0.00 or less.',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
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
    },
    validate: {},
  });

  const paymentDataAddEditForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      totalPayable: '',
      paymentDetails: [
        {
          customerOrder: '',
          paymentMethod: '',
          bank: '',
          branch: '',
          chequeNumber: '',
          depositDate: '',
          amount: '',
        },
      ],
      outstanding: '',
      status: '',
    },
    validate: {},
  });

  const removeRow = (index: number) => {
    setRows(rows.filter((row, rowIndex) => rowIndex !== index));
  };

  const removeModalRow = (indexToRemove: number) => {
    setModalRows(modalRows.filter((_, index) => index !== indexToRemove));
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
              lineTotal: (
                parseFloat(product.sellingPrice) * (parseFloat(row.quantity) || 1)
              )?.toFixed(2),
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
        customer: selectedRequest.customer?._id,
        orderId: selectedRequest.orderId,
        expectedDate: new Date(selectedRequest.expectedDate),
        order: selectedRequest.order?.map((item) => ({
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
        selectedRequest.order?.map((item) => ({
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

  const handleModalOpen = () => {
    setOutstanding(calculateTotal('lineTotal')?.toFixed(2));
    open();
  };

  const handlePaymentChange = (value, field, index) => {
    const updatedPayments = modalRows.map((payment, paymentIndex) => {
      if (paymentIndex === index) {
        const isPaymentCash = value === 'Cash'; // Determine if the payment method is 'Cash'

        // Update the payment method state for this specific row
        setPaymentMethods((prev) => ({ ...prev, [index]: value }));

        // Based on the payment method, determine which fields to disable
        const updatedFieldValues = {
          ...payment,
          [field]: value, // Update the field with the new value
          bank: isPaymentCash ? '' : payment.bank, // Disable bank field if Cash
          branch: isPaymentCash ? '' : payment.branch, // Disable branch field if Cash
          chequeNumber: isPaymentCash ? '' : payment.chequeNumber, // Disable chequeNumber field if not Cash
          depositDate: isPaymentCash ? '' : payment.depositDate, // Disable depositDate field if not Cash
        };

        return updatedFieldValues;
      }
      return payment;
    });
    setModalRows(updatedPayments);
  };

  useEffect(() => {
    // Assuming `paymentMethods` holds the current payment method for each row
    modalRows.forEach((payment, index) => {
      const isPaymentCash = paymentMethods[index] === 'Cash';
      // Update the disabled state of fields based on the payment method
      setModalRows(
        modalRows.map((payment, idx) => {
          if (idx === index) {
            return {
              ...payment,
              bank: isPaymentCash ? '' : payment.bank,
              branch: isPaymentCash ? '' : payment.branch,
              chequeNumber: isPaymentCash ? '' : payment.chequeNumber,
              depositDate: isPaymentCash ? '' : payment.depositDate,
            };
          }
          return payment;
        })
      );
    });
  }, [paymentMethods]); // Depend on `paymentMethods` state

  useEffect(() => {
    const totalPaid = modalRows?.reduce(
      (acc, payment) => acc + parseFloat(payment.amount || '0'),
      0
    );
    const newOutstanding = calculateTotal('lineTotal') - totalPaid;
    setOutstanding(newOutstanding?.toFixed(2));
  }, [modalRows]);

  const handleCustomerOrderCreate = async (event: any) => {
    try {
      // Extracting form values
      const customerOrderPayload = customerOrderAddForm.values;
      const paymentPayload = paymentDataAddEditForm.values;

      // Mock API call to create a customer order and record payment details
      await api.createCustomerOrderAndRecordPayment({
        customerOrder: customerOrderPayload,
        paymentDetails: paymentPayload.paymentDetails,
      });

      customerOrderAddForm.reset();
      paymentDataAddEditForm.reset();

      Notifications.show({
        title: 'Success',
        message: 'Customer order and payment details have been successfully recorded.',
        color: 'green',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      close();
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error processing your request. Please try again later.',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
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
              {/* <Table.Tr>
                  <Table.Td colSpan={6}></Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      Total Discount:
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ fontWeight: 'bold' }}>
                      {calculateTotal('discount')?.toFixed(2)}
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
                      {calculateTotal('tax')?.toFixed(2)}
                    </Text>
                  </Table.Td>
                </Table.Tr> */}
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
          <Button style={{ float: 'right' }} onClick={handleModalOpen}>
            Go to Payments
          </Button>
        </Grid.Col>
      </Grid>

      <Modal opened={opened} onClose={close} withCloseButton={false} size="80%">
        <form action="" onSubmit={customerOrderAddForm.onSubmit(handleCustomerOrderCreate)}>
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
            <Table.Tbody>
              {modalRows?.map((payment, index) => (
                <Table.Tr key={index}>
                  <Table.Td width="15%">
                    <Select
                      size="xs"
                      placeholder="Pick value"
                      data={[
                        { label: 'Cash', value: 'Cash' },
                        { label: 'Cheque', value: 'Cheque' },
                      ]}
                      value={payment.paymentMethod || ''}
                      onChange={(value) => handlePaymentChange(value, 'paymentMethod', index)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      size="xs"
                      placeholder="Bank code"
                      disabled={paymentMethods[index] === 'Cash'}
                      value={payment?.bank}
                      onChange={(e) => handlePaymentChange(e.currentTarget.value, 'bank', index)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      size="xs"
                      placeholder="Branch code"
                      disabled={paymentMethods[index] === 'Cash'}
                      value={payment?.branch}
                      onChange={(e) => handlePaymentChange(e.currentTarget.value, 'branch', index)}
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      size="xs"
                      placeholder="Chq Number"
                      disabled={paymentMethods[index] === 'Cash'}
                      value={payment?.chequeNumber}
                      onChange={(e) =>
                        handlePaymentChange(e.currentTarget.value, 'chequeNumber', index)
                      }
                    />
                  </Table.Td>

                  <Table.Td>
                    <DatePickerInput
                      size="xs"
                      placeholder="Deposit Date"
                      disabled={paymentMethods[index] === 'Cash'}
                      value={payment.depositDate ? new Date(payment.depositDate) : null}
                      onChange={(date) =>
                        handlePaymentChange(date.toISOString().substr(0, 10), 'depositDate', index)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      size="xs"
                      placeholder="Amount"
                      onChange={(e) => handlePaymentChange(e.currentTarget.value, 'amount', index)}
                    />
                  </Table.Td>
                  <Table.Td width={50}>
                    <ActionIcon variant="light" color="red" onClick={() => removeModalRow(index)}>
                      <IconTrash />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Button size="xs" onClick={addModalRow}>
                    New Payment Detail
                  </Button>
                </Table.Td>
                <Table.Td>
                  <Text size="xs">Outstanding:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value={outstanding} readOnly />
                </Table.Td>
                <Table.Td width={50}></Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <Button size="xs" style={{ float: 'right' }} mt={10} mb={10} type="submit">
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default AddCustomerOrders;
