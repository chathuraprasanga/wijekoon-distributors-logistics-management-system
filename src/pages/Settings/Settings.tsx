import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Grid, Text, Button, Badge, Group, Image, ThemeIcon } from '@mantine/core';
import { IconMail, IconPhoto, IconUser, IconUserCog } from '@tabler/icons-react';
import NotFoundImage from './404-image.png'; // Import your 404 image
import { NothingFoundBackground } from '@/components/404/NothingFoundBackground';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function Settings() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role?.name;

  // due to the permission handler is not works
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];

  const hasPrivilege = (permission: string) => {
    try {
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking privilege:', error);
      return false;
    }
  };

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
  };

  const navigateProfile = () => {
    navigate('/admin/settings/profile');
  };

  const navigateEmail = () => {
    navigate('/admin/settings/emails');
  };

  return (
    <>
      <Grid>
        {role === 'Super Admin' && (
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mt="md" mb="xs">
                <ThemeIcon variant="light" color="orange">
                  <IconUserCog style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
                <Text fw={500}>User Management</Text>
              </Group>
            </Card>
          </Grid.Col>
        )}
        <Grid.Col span={3}>
          <Card
            style={{ cursor: 'pointer' }}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            onClick={navigateProfile}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <ThemeIcon variant="light" color="violet">
                <IconUser style={{ width: '70%', height: '70%' }} />
              </ThemeIcon>
              <Text fw={500} style={{ textDecoration: 'none' }}>
                Profile
              </Text>
            </Group>
          </Card>
        </Grid.Col>
        {hasAnyPrivilege(['VIEW_EMAILS', 'DELETE_EMAILS']) && (
          <Grid.Col span={3}>
            <Card
              style={{ cursor: 'pointer' }}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              onClick={navigateEmail}
            >
              <Group justify="space-between" mt="md" mb="xs">
                <ThemeIcon variant="light" color="blue">
                  <IconMail style={{ width: '70%', height: '70%' }} />
                </ThemeIcon>
                <Text fw={500} style={{ textDecoration: 'none' }}>
                  Email
                </Text>
              </Group>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </>
  );
}

export default Settings;
