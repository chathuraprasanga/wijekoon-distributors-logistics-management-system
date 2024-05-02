import React, { useState } from 'react';
import { Button, Card, Center, TextInput, Text, rem } from '@mantine/core';
import { IconCopyright, IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [opened, setOpened] = useState(false);

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
          />

          <Button variant="filled" color="violet" style={{ marginTop: 20 }}>
            Submit
          </Button>

          <p style={{ fontSize: 12 }}>
            Go to login <Link to="/">click here</Link>
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

export default ForgotPassword;
