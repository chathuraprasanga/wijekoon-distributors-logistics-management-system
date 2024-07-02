import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Modal,
  Pagination,
  SegmentedControl,
  Select,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { IconArrowLeft, IconCheck, IconSearch, IconTrash, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { Notifications, useNotifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';
import {
  createCustomerOrder,
  fetchCustomerOrders,
  fetchCustomers,
  setCustomer,
  setCustomerPayment,
} from '@/redux/slices/customerSlice';
import WarehousePaymentModal from './warehousePaymen/WarehousePaymentModal';
import { hasAnyPrivilege } from '@/helpers/utils/permissionHandler';

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

function AddWarehouseCustomerOrders() {
  const [isFirstModalOpen, setFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState(false);
  const [activeModalPage, setModalPage] = useState(1);
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
  const customers = useSelector((state: RootState) => state.customers.customers);
  const customer = useSelector((state: RootState) => state.customers.customer);
  const warehouse = useSelector((state: RootState) => state.assets.warehouse);
  console.log(warehouse);

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
    dispatch(fetchCustomers());
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
      orderId: selectedRequest?.orderId,
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
      warehouse: '',
      customer: '',
      paymentData: {
        totalPayable: '',
        paymentDetails: [],
        outstanding: '',
        status: '',
      },
    },
    validate: {
      order: {
        quantity: (value, values) => {
          const product = filteredProducts.find((p) => p.product.code === values.order.product);
          if (product && value > product.quantity) {
            return `Quantity cannot exceed ${product.quantity}`;
          }
          return null;
        },
      },
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
      // formData.orderId = selectedRequest.orderId;
      // formData.customerOrderRequest = selectedRequest._id;
      formData.status = paymentData.status;
      formData.order = rows;
      formData.subTotal = calculateTotal('lineTotal').toFixed(2);
      formData.totalDiscount = calculateTotal('discount').toFixed(2);
      formData.totalTax = calculateTotal('tax').toFixed(2);
      formData.netTotal = calculateTotal('lineTotal').toFixed(2);
      formData.paymentData = paymentData;
      formData.warehouse = warehouse._id;
      formData.customer = customer._id;

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
      navigate('/admin/assets/warehouses');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the customer order',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  // pagination for modal
  const customersPerPage = 5;
  const handleModalPageChange = (newPage: any) => {
    setModalPage(newPage);
  };
  const startModal = (activeModalPage - 1) * customersPerPage;
  const endModal = startModal + customersPerPage;

  // modal Search
  const [modalSearchSegment, setModalSearchSegment] = useState('Email');
  const [modalSearchTerm, setModalSearchTerm] = useState('');
  const filteredCustomers = customers.filter((customer: any) => {
    const value =
      modalSearchSegment === 'Name'
        ? customer.fullName
        : modalSearchSegment === 'Phone'
          ? customer.phone
          : customer.email;
    return value.toLowerCase().includes(modalSearchTerm.toLowerCase());
  });

  const displayedCustomers = filteredCustomers.slice(startModal, endModal);

  const handleSelectCustomer = (element) => {
    dispatch(setCustomer(element));
    closeSecondModal();
  };

  const modalData = displayedCustomers.map((element, index) => (
    <Table.Tr key={element._id}>
      <Table.Td>{startModal + index + 1}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>
        <Button size="xs" onClick={() => handleSelectCustomer(element)}>
          Select
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const openFirstModal = () => setFirstModalOpen(true);
  const closeFirstModal = () => setFirstModalOpen(false);

  const openSecondModal = () => setSecondModalOpen(true);
  const closeSecondModal = () => setSecondModalOpen(false);

  const openCreateCustomer = () => {
    dispatch(setCustomer(null));
    navigate('/admin/customers/add-edit');
  };

  const filteredProducts = warehouse.stockDetails.filter(
    (stockDetail: any) => stockDetail.quantity > 0
  );

  return (
    <>
      <WarehousePaymentModal
        isOpen={isFirstModalOpen}
        onClose={closeFirstModal}
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
                  <Table.Td>{customer?.fullName || '-'}</Table.Td>
                  <Table.Td width={150} style={{ fontWeight: 'bold', float: 'right' }}>
                    <div style={{ display: 'flex', float: 'right' }}>
                      {hasAnyPrivilege(['ADD_CUSTOMERS', 'VIEW_CUSTOMERS'])}
                      <Button size="xs" onClick={openSecondModal}>
                        {!customer ? 'Select' : 'Change'} Customer
                      </Button>
                      <Button size="xs" ml={10} color="violet" onClick={openCreateCustomer}>
                        Create Customer
                      </Button>
                    </div>
                  </Table.Td>
                  {/* <Table.Td>
                    <Button></Button>
                  </Table.Td> */}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td>
                    {customer?.phone || '-'} | {customer?.phoneSecondary || '-'}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td>{customer?.email || '-'}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td>{customer?.address || '-'}</Table.Td>
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
                        data={filteredProducts.map((stockDetail: any) => ({
                          value: stockDetail.product.code,
                          label: stockDetail.product.code,
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
                        onChange={(e) => {
                          const enteredQuantity = e.currentTarget.value;
                          const product = filteredProducts.find(
                            (p:any) => p.product.code === row.productCode
                          );
                          const availableQuantity = product?.quantity || 0;

                          if (enteredQuantity > availableQuantity) {
                            Notifications.show({
                              title: 'Quantity Exceeded',
                              message: `The entered quantity exceeds the available quantity of ${availableQuantity}.`,
                              color: 'red',
                              icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
                            });
                          }

                          const quantity = Math.min(enteredQuantity, availableQuantity);
                          handleChange(quantity, 'quantity', index);
                        }}
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
            <Button
              style={{ float: 'right' }}
              onClick={!paymentData ? () => openFirstModal() : handleSave}
            >
              {!paymentData ? 'Go to Payments' : 'Save'}
            </Button>
          </Grid.Col>
        </Grid>
      </form>

      <Modal
        opened={isSecondModalOpen}
        onClose={closeSecondModal}
        withCloseButton={false}
        size="70%"
      >
        <Text size="md" style={{ fontWeight: 'bold' }}>
          Select Customer to Create Customer Order Request
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SegmentedControl
            size="xs"
            color="violet"
            data={['Name', 'Phone', 'Email']}
            defaultValue="Email"
            onChange={setModalSearchSegment}
          />
          <TextInput
            ml={10}
            size="xs"
            placeholder="Search"
            onChange={(event) => setModalSearchTerm(event.currentTarget.value)}
            rightSection={<IconSearch size="20" color="gray" />}
          />
        </div>
        <div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Customer</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {modalData.length > 0 ? (
                modalData
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={10}>
                    <Text color="dimmed" align="center">
                      No data found
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
          <Pagination
            total={Math.ceil(filteredCustomers.length / customersPerPage)}
            value={activeModalPage}
            onChange={handleModalPageChange}
            mt={10}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            size="xs"
          />
        </div>
      </Modal>
    </>
  );
}

export default AddWarehouseCustomerOrders;
