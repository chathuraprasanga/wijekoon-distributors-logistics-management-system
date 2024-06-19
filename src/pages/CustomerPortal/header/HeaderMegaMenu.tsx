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
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../home';
import CustomerLogin from '../pages/CustomerLogin';
import CustomerSignUp from '../pages/CustomerSignUp';
import Products from '../pages/Products';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            {/* <MantineLogo size={30} /> */}
            <Text fw={'bold'}>WIJEKOON DISTRIBUTORS</Text>

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

            <Group visibleFrom="sm">
              <Link to='/customer-login'><Button variant="default" >Log in</Button></Link>
              <Link to='/customer-signup'><Button>Sign up</Button></Link>
            </Group>

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
