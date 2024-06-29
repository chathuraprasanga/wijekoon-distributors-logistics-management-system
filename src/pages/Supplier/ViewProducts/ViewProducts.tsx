import { hasPrivilege } from '@/helpers/utils/permissionHandler';
import { RootState } from '@/redux/store';
import {
  Grid,
  Card,
  Table,
  ActionIcon,
  Badge,
  Button,
  Divider,
  Text,
  SimpleGrid,
  Image,
} from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state: RootState) => state.suppliers.product);
  console.log(selectedProduct);

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

  const handleEditProduct = () => {
    navigate('/admin/suppliers/add-edit-products');
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
                View Product
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table withTableBorder withColumnBorders>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Product Code</Text>
            </Table.Td>
            <Table.Td>
              <Text>{selectedProduct?.code || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Name</Text>
            </Table.Td>
            <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>{selectedProduct?.name || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200} style={{ alignContent: 'start' }}>
              <Text>Size</Text>
            </Table.Td>
            <Table.Td>
              <Text>{`${selectedProduct?.size} KG` || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Buying Price</Text>
            </Table.Td>
            <Table.Td>
              <Text>{selectedProduct?.buyingPrice.toFixed(2) || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Selling Price</Text>
            </Table.Td>
            <Table.Td>
              <Text>{selectedProduct?.sellingPrice.toFixed(2) || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Supplier</Text>
            </Table.Td>
            <Table.Td>
              <Text>{selectedProduct?.supplier?.name || 'N/A'}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Status</Text>
            </Table.Td>
            <Table.Td>
              <Text>
                <Badge
                  color={selectedProduct.status === 'ACTIVE' ? 'green' : 'red'}
                  radius="xs"
                  size="xs"
                >
                  {selectedProduct?.status || 'N/A'}
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width={200}>
              <Text>Notes</Text>
            </Table.Td>
            <Table.Td rowSpan={2}>
              <Text>{selectedProduct?.notes || '-'}</Text>
            </Table.Td>
          </Table.Tr>
        </Table>
        <Table>
          <Table.Tr>
            <Table.Td colSpan={2}>
              <SimpleGrid cols={1} mt="xl">
                <Image
                  src={selectedProduct.imageUrl}
                  alt="Product Image"
                  style={{ width: '200px', height: '200px' }} // Set your desired width and height
                />
              </SimpleGrid>
            </Table.Td>
          </Table.Tr>
        </Table>

        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          {hasPrivilege('EDIT_PRODUCTS') && (
            <Button onClick={handleEditProduct}>Edit Product</Button>
          )}
        </div>

        <Divider my="md" />
      </Card>
    </>
  );
}

export default ViewProducts;
