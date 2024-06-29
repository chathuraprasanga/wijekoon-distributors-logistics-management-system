import { customerLogin } from '@/redux/slices/customerPortalSlice';
import { AppDispatch } from '@/redux/store';
import {
  Paper,
  Center,
  Title,
  TextInput,
  Select,
  Textarea,
  Table,
  Text,
  Button,
  ActionIcon,
  CloseIcon,
  rem,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconEye, IconEyeClosed, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CustomerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
      password: isNotEmpty('Password is required'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await dispatch(customerLogin(values)).unwrap();
      navigate('/customer/dashboard');
    } catch (e: any) {
      console.log(e);
      Notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%202.jpg?alt=media&token=4823813d-fa20-4eb8-81f7-6f6c1edf7006")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ maxWidth: 480, width: '100%' }}>
        <ActionIcon
          color="red"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          <CloseIcon />
        </ActionIcon>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Center>
            <Title order={2}>Login</Title>
          </Center>
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  required
                  mt="xs"
                  {...form.getInputProps('email')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <TextInput
                  label="Password"
                  placeholder="xxxxxxxxxx"
                  required
                  mt="xs"
                  type={showPassword ? 'text' : 'password'}
                  rightSection={
                    showPassword ? (
                      <IconEye onClick={toggleShowPassword} />
                    ) : (
                      <IconEyeClosed onClick={toggleShowPassword} />
                    )
                  }
                  {...form.getInputProps('password')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Button type="submit" fullWidth mt="md">
                  Login
                </Button>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Text>
                  Dont Have an account? <Link to="/customer-signup">Click here</Link>{' '}
                </Text>
                <Text>
                  <Link to="/customer-forgot-password">Forgot Password?</Link>
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table>
        </form>
      </Paper>
    </div>
  );
}

export default CustomerLogin;
