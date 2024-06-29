import { changeUserPassword } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { Badge, Button, Card, Grid, Table, Text, TextInput, rem } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changePassword, setChangePassword] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      userId: user?._id,
      email: user?.email,
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
      userId: values.userId,
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    try {
      await dispatch(changeUserPassword(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: `Change Password Successfully`,
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      form.reset();
      setChangePassword(false);
    } catch (e:any) {
      console.error('Error updating cheque:', e);
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
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Profile
              </Text>
            </div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table>
              <tbody>
                <tr>
                  <td width={30}>
                    <Text>Username</Text>
                  </td>
                  <td width={10}>:</td>
                  <td style={{ textTransform: 'capitalize' }}>{user?.name}</td>
                </tr>
                <tr>
                  <td width={30}>
                    <Text>Email:</Text>
                  </td>
                  <td width={10}>:</td>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <td width={30}>
                    <Text>Role:</Text>
                  </td>
                  <td width={10}>:</td>
                  <td>
                    <Badge>{user?.role?.name}</Badge>
                  </td>
                </tr>
              </tbody>
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

export default Profile;
