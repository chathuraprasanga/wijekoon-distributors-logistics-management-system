import React, { useState } from 'react';
import { Card, Center, TextInput, Text, rem, PasswordInput, Button } from '@mantine/core';
import { IconCopyright, IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function Login() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const valid = value.trim().length >= 6;
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
        <Card shadow="sm" padding="lg" radius="md" style={{ width: 300 }} withBorder>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="./src/assets/logo1.png" alt="" style={{ width: 150 }} />
          </div>

          <TextInput
            rightSection={rightSection}
            label="User Email"
            placeholder="Your email"
            withAsterisk
            required
          />

          <PasswordInput
            label="Password"
            required
            placeholder="Your password"
            onFocus={() => setOpened(true)}
            onBlur={() => setOpened(false)}
            mt="md"
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />

          <Link to="/admin/dashboard">
            <Button variant="filled" color="violet" style={{ marginTop: 20, width: '100%' }}>
              Login
            </Button>
          </Link>

          <p style={{ fontSize: 12 }}>
            Forgot Password? <Link to="/forgot-password">Click Here</Link>
          </p>
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
