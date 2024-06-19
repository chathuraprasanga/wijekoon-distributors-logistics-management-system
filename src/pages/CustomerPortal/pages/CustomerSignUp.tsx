import React, { useState } from 'react';
import {
  Paper,
  Center,
  Title,
  TextInput,
  Table,
  Select,
  Textarea,
  Button,
  Text,
  ActionIcon,
  CloseIcon,
  rem,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconCheck, IconEye, IconEyeClosed, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Notifications } from '@mantine/notifications';
import { createCustomerinCustomerPortal } from '@/redux/slices/customerPortalSlice';

function CustomerSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      secondaryPhone: '',
      type: 'Individual Customer',
      hardwareName: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      fullName: isNotEmpty('Name is Required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value.length === 10 ? null : 'Phone number must be 10 digits'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSignUp = async (values: typeof form.values) => {
    // Handle the signup logic here
    console.log('Signup values:', values);
    try {
      await dispatch(createCustomerinCustomerPortal(values)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Customer Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset(); // Reset the form state
      navigate('/customer-login');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: `Customer Registration Error: ${e.message}`,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

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
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ maxWidth: 640, width: '100%' }}>
        <ActionIcon
          color="red"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          <CloseIcon />
        </ActionIcon>
        <form onSubmit={form.onSubmit(handleSignUp)}>
          <Center>
            <Title order={2}>Sign Up</Title>
          </Center>
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <TextInput
                  label="Name"
                  placeholder="Enter Your Name"
                  required
                  mt="xs"
                  {...form.getInputProps('fullName')}
                />
              </Table.Td>
            </Table.Tr>
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
              <Table.Td>
                <TextInput
                  label="Phone"
                  placeholder="07XXXXXXXX"
                  required
                  mt="xs"
                  {...form.getInputProps('phone')}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  label="Secondary Phone"
                  placeholder="07XXXXXXXX"
                  mt="xs"
                  {...form.getInputProps('secondaryPhone')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Select
                  label="Customer Type"
                  placeholder="Select Customer Type"
                  data={['Hardware Store', 'Individual Customer']}
                  mt="md"
                  required
                  allowDeselect={false}
                  {...form.getInputProps('type')}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  label="Hardware Name"
                  placeholder="Enter Your Hardware"
                  mt="xs"
                  disabled={form.values.type !== 'Hardware Store'}
                  {...form.getInputProps('hardwareName')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Textarea
                  label="Address"
                  placeholder="Enter Your Address"
                  required
                  mt="xs"
                  {...form.getInputProps('address')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Password"
                  placeholder="Your password"
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
              <Table.Td>
                <TextInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                  mt="xs"
                  type={showConfirmPassword ? 'text' : 'password'}
                  rightSection={
                    showConfirmPassword ? (
                      <IconEye onClick={toggleShowConfirmPassword} />
                    ) : (
                      <IconEyeClosed onClick={toggleShowConfirmPassword} />
                    )
                  }
                  {...form.getInputProps('confirmPassword')}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Button type="submit" fullWidth>
                  Sign Up
                </Button>
              </Table.Td>
            </Table.Tr>
            <Text>
              Already Have an account? <Link to="/customer-login">Click here</Link>{' '}
            </Text>
          </Table>
        </form>
      </Paper>
    </div>
  );
}

export default CustomerSignUp;
