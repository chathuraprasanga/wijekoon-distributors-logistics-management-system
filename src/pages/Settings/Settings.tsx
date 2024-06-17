import { ActionIcon, Card, Grid, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import React from 'react';
// import { Link } from 'react-router-dom';

function Settings() {
  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>User Management</Text>
              <ActionIcon variant="light" size="md" aria-label="Settings">
                <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Settings;
