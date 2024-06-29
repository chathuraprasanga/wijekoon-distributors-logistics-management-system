import cx from 'clsx';
import { useState, useEffect } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconSettings, IconChevronDown } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderTabs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getRandomAvatarUrl } from '../../../helpers/utils/avatar';
import { customerLogout } from '@/redux/slices/customerPortalSlice';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabs = ['Home', 'Request', 'Order Requests', 'Orders', 'Payments', 'Cheques'];
const tabLinks = {
  Home: '/customer/dashboard',
  Request: '/customer/request',
  'Order Requests': '/customer/customer-requests',
  Orders: '/customer/orders',
  Payments: '/customer/payments',
  Cheques: '/customer/cheques',
};

export function CustomerLayout() {
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const avatarUrl = getRandomAvatarUrl(customer?.fullName);

  const mapPathToTab = (path: string) => {
    for (const [tab, link] of Object.entries(tabLinks)) {
      if (path === link) {
        return tab;
      }
    }
    return 'Home';
  };

  const [activeTab, setActiveTab] = useState(mapPathToTab(location.pathname));

  useEffect(() => {
    if (!customer) {
      navigate('/');
    }
  }, [customer, navigate]);

  useEffect(() => {
    setActiveTab(mapPathToTab(location.pathname));
  }, [location.pathname]);

  const items = tabs.map((tab) => (
    <Link to={tabLinks[tab]} style={{ textDecoration: 'none' }} key={tab}>
      <Tabs.Tab value={tab}>{tab}</Tabs.Tab>
    </Link>
  ));

  const handleLogout = () => {
    dispatch(customerLogout());
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/customer/settings');
  };

  return (
    <>
      <div className={classes.header}>
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">
            {/* <MantineLogo size={28} /> */}
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <Text fw={'bold'}>WIJEKOON DISTRIBUTORS</Text>
            </Link>

            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={avatarUrl}
                      alt={customer?.fullName?.split(' ')[0]}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {customer?.fullName}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={handleSettings}
                >
                  Account settings
                </Menu.Item>

                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container size="md">
          <Tabs
            value={activeTab}
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
      <div style={{ marginLeft: 300, marginRight: 300, marginTop: -100 }}>
        <Text fw={'bold'}>Hello {customer?.fullName}.!</Text>
        <hr />
        <Outlet />
      </div>
    </>
  );
}
