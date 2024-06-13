import React, { useState } from 'react';
import { Button, Card, Center, TextInput, Text, rem } from '@mantine/core';
import { IconCheck, IconCopyright, IconUser, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { forgotPassword } from '@/redux/slices/authSlice';

function ForgotPassword() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);

  const forgotPasswordForm = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => {
        if (!/^\S+@\S+$/.test(value)) {
          return 'Email is not valid';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof forgotPasswordForm.values) => {
    try {
      await dispatch(forgotPassword(values)).unwrap();
      if (error === null) {
        Notifications.show({
          title: 'Successful',
          message: 'Check your Email',
          icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        });
        navigate('/');
      }
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: `${e.message}`,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rightSection = (
    <Text component="div" c="dimmed">
      <Center>
        <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </Center>
    </Text>
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {' '}
      <img
        src="./src/assets/bg.jpg"
        alt=""
        style={{ height: '100%', width: '100%', position: 'fixed' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <form onSubmit={forgotPasswordForm.onSubmit(handleSubmit)}>
          <Card shadow="sm" padding="lg" radius="md" style={{ width: 300 }} withBorder>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="./src/assets/logo1.png" alt="" style={{ width: 150 }} />
            </div>

            <TextInput
              rightSection={rightSection}
              label="User Email"
              placeholder="Type your email here"
              withAsterisk
              required
              key={forgotPasswordForm.key('email')}
              {...forgotPasswordForm.getInputProps('email')}
            />

            <Button type="submit" variant="filled" color="violet" style={{ marginTop: 20 }}>
              Submit
            </Button>

            <p style={{ fontSize: 12 }}>
              Go to login <Link to="/">click here</Link>
            </p>
          </Card>
        </form>
        <p
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            color: 'white',
            fontSize: 12,
            fontWeight: 20,
          }}
        >
          <IconCopyright size={12} /> Xcorpion. All Rights Received
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
