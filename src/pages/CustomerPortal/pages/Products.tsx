import React, { useEffect } from 'react';
import { Button, Text, Image, Card, Grid, Group, Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/redux/slices/supplierSlice';
import { RootState } from '@/redux/store';

function CustomerProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.suppliers.products);
  const loggedCustomer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRequest = () => {
    if (loggedCustomer) {
      navigate('/customer/dashboard');
    } else {
      navigate('/customer-login');
    }
  };

  return (
    <>
      <div>
        <Image
          mt={-120}
          radius="md"
          h={420}
          src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fheading1.jpg?alt=media&token=2403baf9-40b4-462d-a950-1a693cded54e"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text fw={'bold'} style={{ fontSize: 48 }}>
            Products
          </Text>
        </div>

        <div style={{ marginLeft: 150, marginRight: 150, marginTop: 20 }}></div>
      </div>

      <div style={{ marginTop: 50, marginLeft: 150, marginRight: 150, marginBottom: -60 }}>
        <Grid>
          {products.map((product, index) => (
            <Grid.Col span={3} key={index}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={product.imageUrl}
                    alt="Product Image"
                    style={{ height: '160px' }} // Set your desired width and height
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  {/* Assuming all products have the same status for simplicity */}
                  <Badge color={product?.status === 'ACTIVE' ? 'green' : 'red'}>
                    {product?.status}
                  </Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {product.notes || 'No additional notes available.'}
                </Text>

                <Text size="sm" c="dimmed" fw={'bold'}>
                  {product.size || '-'} KG
                </Text>

                <Text size="sm" c="dimmed" fw={'bold'}>
                  LKR {product?.sellingPrice?.toFixed(2) || 'N/A'}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md" onClick={handleRequest}>
                  Make Request
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default CustomerProducts;
