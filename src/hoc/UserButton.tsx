import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UnstyledButton, Group, Avatar, Text, rem, Menu } from '@mantine/core';
import { IconChevronRight, IconLogout2, IconSettings } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import { AppDispatch, RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

export function UserButton() {
  const dispatch: AppDispatch = useDispatch(); // Type the dispatch correctly
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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
              <Text size="sm" fw={500} style={{ textTransform: 'capitalize' }}>
                {userDetails?.name}
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

            <Menu.Item
              color="red"
              leftSection={
                <IconLogout2
                  style={{ width: rem(14), height: rem(14) }}
                  onClick={handleLogout}
                />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </UnstyledButton>
  );
}
