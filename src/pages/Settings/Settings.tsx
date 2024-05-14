import { Button, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

function Settings() {
  return (
    <>
      <Text fw="bold" size="xl">
        This Page Under Development
      </Text>
      <Link to="/admin/dashboard">
        <Button> Click Here to go to Dashboard</Button>
      </Link>
    </>
  );
}

export default Settings;
