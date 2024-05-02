import { Link } from 'react-router-dom';
import { UnstyledButton, Group, Avatar, Text, rem, Menu } from '@mantine/core';
import { IconChevronRight, IconLogout2, IconSettings } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user} style={{ cursor: 'default' }}>
      <Group>
        <Menu>
          <Avatar
            style={{ cursor: 'default' }}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            radius="xl"
          />
          <Menu.Target>
            <div style={{ flex: 1, color: 'white', cursor: 'pointer' }}>
              <Text size="sm" fw={500}>
                Chathura Prasanga
              </Text>
            </div>
          </Menu.Target>
          <IconChevronRight
            style={{ width: rem(14), height: rem(14), color: 'white' }}
            stroke={1.5}
          />

          <Menu.Dropdown>
            <Link to="/admin/settings" style={{ textDecoration: 'none' }}>
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Settings
              </Menu.Item>
            </Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Menu.Item
                color="red"
                leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
              >
                Logout
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
