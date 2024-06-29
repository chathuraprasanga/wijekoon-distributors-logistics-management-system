/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Notifications } from '@mantine/notifications';
import { Card, Center, TextInput, Text, rem, PasswordInput, Button } from '@mantine/core';
import { IconCheck, IconCopyright, IconUser, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { tosNotify } from '@/helpers/utils/showNotificatio';

function Login() {
  const [opened, setOpened] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);
  const status = useSelector((state: RootState) => state.auth.status);
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log(error);

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);


  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
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

  const handleLogin = async (values: typeof loginForm.values) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate('/admin/dashboard');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: e.message,
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

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
        backgroundImage: './src/assets/bg.jpg',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      }}
    >
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
        <Card shadow="sm" padding="lg" radius="md" style={{ width: 300 }} withBorder>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="./src/assets/logo1.png" alt="" style={{ width: 150 }} />
          </div>

          <form onSubmit={loginForm.onSubmit(handleLogin)}>
            <TextInput
              rightSection={rightSection}
              label="User Email"
              placeholder="Your email"
              withAsterisk
              required
              key={loginForm.key('email')}
              {...loginForm.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              required
              placeholder="Your password"
              onFocus={() => setOpened(true)}
              onBlur={() => setOpened(false)}
              mt="md"
              key={loginForm.key('password')}
              {...loginForm.getInputProps('password')}
            />

            <Button
              type="submit"
              variant="filled"
              color="violet"
              style={{ marginTop: 20, width: '100%' }}
            >
              Login
            </Button>

            <p style={{ fontSize: 12 }}>
              Forgot Password? <Link to="/forgot-password">Click Here</Link>
            </p>
          </form>
        </Card>

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

export default Login;
