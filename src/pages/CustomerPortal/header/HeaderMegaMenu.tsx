import cx from 'clsx';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Avatar,
  Menu,
} from '@mantine/core';
//   import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconHome2,
  IconHome,
  IconDashboard,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../home';
import CustomerLogin from '../pages/CustomerLogin';
import CustomerSignUp from '../pages/CustomerSignUp';
import Products from '../pages/Products';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getRandomAvatarUrl } from '../../../helpers/utils/avatar';
import { customerLogout } from '@/redux/slices/customerPortalSlice';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const dispatch = useDispatch();

  const avatarUrl = getRandomAvatarUrl(customer?.fullName);

  const handleLogout = () => {
    dispatch(customerLogout());
    window.location.reload();
  };

  return (
    <>
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            {/* <MantineLogo size={30} /> */}
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><Text fw={'bold'}>WIJEKOON DISTRIBUTORS</Text></Link>

            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="http://localhost:5173/" className={classes.link}>
                Home
              </a>
              <a href="http://localhost:5173/products" className={classes.link}>
                Products
              </a>
              <a href="http://localhost:5173/about-us" className={classes.link}>
                About Us
              </a>
              <a href="http://localhost:5173/contact-us" className={classes.link}>
                Contact Us
              </a>
            </Group>

            {!customer ? (
              <Group visibleFrom="sm">
                <Link to="/customer-login">
                  <Button variant="default">Log in</Button>
                </Link>
                <Link to="/customer-signup">
                  <Button>Sign up</Button>
                </Link>
              </Group>
            ) : (
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
                      <Avatar src={avatarUrl} alt={customer.fullName} radius="xl" size={20} />
                      <Text fw={500} size="sm" lh={1} mr={3}>
                        {customer?.fullName}
                      </Text>
                      <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>
                  <Link style={{ textDecoration: 'none' }} to="/customer/dashboard">
                    <Menu.Item
                      leftSection={
                        <IconDashboard style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                      }
                    >
                      Customer Portal
                    </Menu.Item>
                  </Link>

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
            )}

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}
