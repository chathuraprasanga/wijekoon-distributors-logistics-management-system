import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Menu,
  Modal,
  Pagination,
  SegmentedControl,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import {
  deleteProduct,
  fetchProducts,
  fetchSuppliers,
  setProduct,
} from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';
import { hasPrivilege } from '@/helpers/utils/permissionHandler';

function Products() {
  const [opened, setOpened] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.suppliers.products);
  const status = useSelector((state: RootState) => state.suppliers.status);

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

  // for pagination
  const [activePage, setPage] = useState(1);
  const productsPerPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Supplier');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  // pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * productsPerPage;
  const end = start + productsPerPage;

  // filtering products based on search
  const filteredProducts = products.filter((product: any) => {
    const value = searchSegment === 'Supplier' ? product.supplier?.name || '' : product.name || '';
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedProducts = filteredProducts.slice(start, end);

  const handleViewEdit = (product: any, action: string) => {
    if (action === 'delete') {
      setProductToDelete(product);
      setOpened(true);
    } else {
      dispatch(setProduct(product));
      if (action === 'view') {
        navigate('/admin/suppliers/view-products');
      } else if (action === 'edit') {
        navigate('/admin/suppliers/add-edit-products');
      }
    }
  };

  const handleAddProductBtn = () => {
    dispatch(setProduct(null));
    navigate('/admin/suppliers/add-edit-products');
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      setOpened(false);
      dispatch(fetchProducts());
      Notifications.show({
        title: 'Successful',
        message: 'Product Deleted Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error deleting the product',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const rows = displayedProducts.map((product: any, index: number) => (
    <Table.Tr key={product._id}>
      <Table.Td>{product.code}</Table.Td>
      <Table.Td>{product?.name}</Table.Td>
      <Table.Td>{product.size}</Table.Td>
      <Table.Td>{product.buyingPrice}</Table.Td>
      <Table.Td>{product.sellingPrice}</Table.Td>
      <Table.Td>{product.supplier?.name}</Table.Td>
      <Table.Td>
        <Badge color={product.status === 'ACTIVE' ? 'green' : 'red'} radius="xs" size="xs">
          {product.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={150}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>
          <Menu.Dropdown>
            {hasPrivilege('VIEW_PRODUCTS') && (
              <Menu.Item onClick={() => handleViewEdit(product, 'view')}>View</Menu.Item>
            )}
            {hasPrivilege('EDIT_PRODUCTS') && (
              <Menu.Item onClick={() => handleViewEdit(product, 'edit')}>Edit</Menu.Item>
            )}
            {hasPrivilege('DELETE_PRODUCTS') && (
              <Menu.Item onClick={() => handleViewEdit(product, 'delete')} color="red">
                Delete
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Product Code</Table.Th>
      <Table.Th>Name</Table.Th>
      <Table.Th>Size</Table.Th>
      <Table.Th>Buying Price</Table.Th>
      <Table.Th>Selling Price</Table.Th>
      <Table.Th>Supplier</Table.Th>
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Products</Text>
            </div>
            {hasPrivilege('ADD_PRODUCTS') && (
              <Button size="sm" onClick={handleAddProductBtn}>
                Add Product
              </Button>
            )}
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Name', 'Supplier']}
                defaultValue="Supplier"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
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
              total={Math.ceil(filteredProducts.length / productsPerPage)}
              value={activePage}
              onChange={handlePageChange}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      {/* delete modal */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the product {productToDelete?.name}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDeleteProduct(productToDelete._id)}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default Products;
