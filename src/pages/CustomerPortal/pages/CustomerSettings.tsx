import { changeUserPassword } from '@/redux/slices/authSlice';
import { changeCustomerPassword } from '@/redux/slices/customerPortalSlice';
import { RootState } from '@/redux/store';
import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Table,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CustomerSettings() {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  const [changePassword, setChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const error = useSelector((state: RootState) => state.customerPortal.error);

  const togglePasswordVisibility = (inputType: string) => {
    switch (inputType) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const form = useForm({
    initialValues: {
      userId: customer?._id,
      email: customer?.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: isNotEmpty('Current Password is required'),
      newPassword: isNotEmpty('New Password is required'),
      confirmPassword: (value, values) => {
        if (!value.trim()) {
          return 'Confirm Password is required';
        }

        if (value !== values.newPassword) {
          return 'Passwords do not match';
        }
        return null;
      },
    },
  });

  const handlePasswordChange = async (values: any) => {
    const payload = {
      customerId: values.userId,
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    try {
      await dispatch(changeCustomerPassword(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: `Change Password Successfully`,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset();
      setChangePassword(false);
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

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width={30}>
                  <Text>Name</Text>
                </Table.Td>
                <Table.Td width={10}>:</Table.Td>
                <Table.Td>{customer.fullName}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={30}>
                  <Text>Phone</Text>
                </Table.Td>
                <Table.Td width={10}>:</Table.Td>
                <Table.Td>{customer.phone}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={30}>
                  <Text>Email</Text>
                </Table.Td>
                <Table.Td width={10}>:</Table.Td>
                <Table.Td>{customer.email}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={30}>
                  <Text>Hardware Name</Text>
                </Table.Td>
                <Table.Td width={10}>:</Table.Td>
                <Table.Td>{customer.hardwareName || 'N/A'}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={30}>
                  <Text>Address</Text>
                </Table.Td>
                <Table.Td width={10}>:</Table.Td>
                <Table.Td>{customer.address}</Table.Td>
              </Table.Tr>
            </Table>
            <div style={{ marginTop: 10 }}>
              {!changePassword && (
                <Button
                  style={{ float: 'right' }}
                  size="xs"
                  onClick={() => setChangePassword(true)}
                >
                  Change Password
                </Button>
              )}
              {changePassword && (
                <Button
                  style={{ float: 'right' }}
                  size="xs"
                  color="red"
                  onClick={() => {
                    setChangePassword(false);
                    form.reset();
                  }}
                >
                  Close
                </Button>
              )}
            </div>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          {changePassword && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <form onSubmit={form.onSubmit(handlePasswordChange)}>
                <Table withRowBorders={false}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          label="Current password"
                          withAsterisk
                          placeholder="Current Password"
                          type={showCurrentPassword ? 'text' : 'password'}
                          rightSection={
                            showCurrentPassword ? (
                              <IconEye onClick={() => togglePasswordVisibility('current')} />
                            ) : (
                              <IconEyeOff onClick={() => togglePasswordVisibility('current')} />
                            )
                          }
                          {...form.getInputProps('currentPassword')}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          label="New Password"
                          withAsterisk
                          placeholder="New Password"
                          type={showNewPassword ? 'text' : 'password'}
                          rightSection={
                            showNewPassword ? (
                              <IconEye onClick={() => togglePasswordVisibility('new')} />
                            ) : (
                              <IconEyeOff onClick={() => togglePasswordVisibility('new')} />
                            )
                          }
                          {...form.getInputProps('newPassword')}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <TextInput
                          label="Confirm password"
                          withAsterisk
                          placeholder="Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          rightSection={
                            showConfirmPassword ? (
                              <IconEye onClick={() => togglePasswordVisibility('confirm')} />
                            ) : (
                              <IconEyeOff onClick={() => togglePasswordVisibility('confirm')} />
                            )
                          }
                          {...form.getInputProps('confirmPassword')}
                        />
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Button size="xs" style={{ float: 'right' }} type="submit">
                          Save
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </form>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default CustomerSettings;
