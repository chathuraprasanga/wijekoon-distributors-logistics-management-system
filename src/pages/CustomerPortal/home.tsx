import { Text, Button } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate('admin-login');
  };
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="xl" fw="bold">
          Welcome To Wijekoon Distributors Customer Portal
        </Text>
        <Text>This Page Under Development</Text>
        <hr />
        <Button onClick={handleAdmin}>Are you Admin?</Button>
      </div>
    </>
  );
}

export default Home;
