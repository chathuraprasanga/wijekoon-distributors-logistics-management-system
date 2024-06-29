import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Text,
  Image,
  Indicator,
  Modal,
  ScrollArea,
  NumberInput,
  rem,
} from '@mantine/core';
import { IconCheck, IconShoppingCart, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomerOrderRequestCP, fetchCustomerProducts } from '@/redux/slices/customerPortalSlice';
import { RootState } from '@/redux/store';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';

interface Product {
  _id: string;
  name: string;
  status: string;
  notes?: string;
  size?: string;
  sellingPrice: number;
  imageUrl: string;
}

interface OrderItem {
  product: string;
  quantity: number;
  lineTotal: number;
}

interface FormValues {
  customer: string;
  expectedDate: Date | null;
  order: OrderItem[];
  netTotal: number;
  status: string;
  subTotal: number;
  totalTax: number;
  totalDiscount: number;
}

function CustomerRequest() {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.customerPortal.customerProducts);
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  const [cart, setCart] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchCustomerProducts());
  }, [dispatch]);

  const form = useForm<FormValues>({
    initialValues: {
      customer: customer._id,
      expectedDate: null,
      order: [],
      netTotal: 0,
      status: 'PENDING',
      subTotal: 0,
      totalTax: 0,
      totalDiscount: 0,

    },
    validate: {
      expectedDate: isNotEmpty('Expected Date is Required'),
    },
  });

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setQuantities({ ...quantities, [product._id]: 1 });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCart(cart.filter((item) => item._id !== product._id));
    const { [product._id]: _, ...rest } = quantities;
    setQuantities(rest);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities({ ...quantities, [productId]: quantity });
  };

  const isInCart = (product: Product) => {
    return cart.some((item) => item._id === product._id);
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      return total + product.sellingPrice * quantity;
    }, 0);
  };

  const handleSubmit = async (values: FormValues) => {
    const order = cart.map((product) => ({
      product: product._id,
      quantity: quantities[product._id],
      lineTotal: product.sellingPrice * quantities[product._id],
    }));

    const netTotal = order.reduce((total, item) => total + item.lineTotal, 0);

    const submissionData = {
      ...values,
      order,
      netTotal,
    };

    console.log('Form Submitted:', submissionData);
    try {
      await dispatch(createCustomerOrderRequestCP(submissionData)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer Request Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset();
      setCart([]);
      close();
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text fw={'bold'} size="lg">
          Products
        </Text>
        <Indicator label={cart.length} size={16}>
          <ActionIcon onClick={cart.length > 0 ? open : close}>
            <IconShoppingCart />
          </ActionIcon>
        </Indicator>
      </div>

      <hr />
      <div>
        <Grid>
          {products.map((product: Product, index: number) => (
            <Grid.Col span={3} key={index}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={product.imageUrl}
                    alt="Product Image"
                    style={{ height: '160px' }} // Set your desired width and height
                  />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  <Badge color={product?.status === 'ACTIVE' ? 'green' : 'red'}>
                    {product?.status}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  {product.notes || 'No additional notes available.'}
                </Text>

                <Text size="sm" color="dimmed" fw={'bold'}>
                  {product.size || '-'} KG
                </Text>

                <Text size="sm" color="dimmed" fw={'bold'}>
                  LKR {product?.sellingPrice?.toFixed(2) || 'N/A'}
                </Text>

                {isInCart(product) ? (
                  <Button
                    color="red"
                    fullWidth
                    mt="md"
                    radius="sm"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="sm"
                    onClick={() => handleAddToCart(product)}
                    disabled={product?.status === 'DEACTIVE'}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        closeOnClickOutside
        size="100%"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div>
              <Text fw={'bold'}>Customer Order Request</Text>
            </div>
            <hr />
            <ScrollArea style={{ flex: 1 }}>
              {cart.map((product: Product, index: number) => (
                <Card
                  key={index}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{ marginBottom: '10px' }}
                >
                  <Grid>
                    <Grid.Col span={2}>
                      <Image
                        src={product.imageUrl}
                        alt="Product Image"
                        style={{ width: '100px' }} // Set your desired width and height
                      />
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Group position="apart">
                        <Text fw={500}>{product.name}</Text>
                        <Badge color={product?.status === 'ACTIVE' ? 'green' : 'red'}>
                          {product?.status}
                        </Badge>
                      </Group>
                      <Text size="sm" color="dimmed">
                        LKR {product?.sellingPrice?.toFixed(2) || 'N/A'}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Group position="apart" mt="md">
                        <NumberInput
                          value={quantities[product._id]}
                          onChange={(value: number) => handleQuantityChange(product._id, value)}
                          min={1}
                        />
                      </Group>
                    </Grid.Col>
                    <Grid.Col span={3} style={{ textAlign: 'right' }}>
                      <Text fw={'bold'}>
                        LKR {(product.sellingPrice * (quantities[product._id] || 1)).toFixed(2)}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
            </ScrollArea>
            <hr />
            <div>
              <Group position="apart" mt="md" style={{ justifyContent: 'space-between' }}>
                <DatePickerInput
                  style={{ width: 200 }}
                  label="Expected Date"
                  placeholder="Pick date"
                  {...form.getInputProps('expectedDate')}
                  withAsterisk
                />
                <Text fw={'bold'} size="lg">
                  Total Cost: LKR {calculateTotal().toFixed(2)}
                </Text>
              </Group>
            </div>
            <hr />
            <div>
              <Button style={{ float: 'right' }} type="submit">
                Request
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CustomerRequest;
