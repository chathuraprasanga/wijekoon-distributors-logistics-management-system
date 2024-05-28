import { Outlet } from 'react-router-dom';
import { AppShell, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UserButton } from './UserButton';
import NavBarTesting from './NavBarTesting';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: '#5E1588' }}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div
            style={{
              fontSize: 11,
              paddingLeft: 10,
              display: 'flex',
              justifyContent: 'space-between',
              // color: 'white',
              // backgroundColor: 'black',
            }}
          >
            <h2
              style={{
                fontWeight: 'bolder',
                backgroundColor: 'black',
                color: 'white',
                paddingTop: 5,
                paddingRight: 5,
                paddingLeft: 5,
                paddingBottom: 2,
              }}
            >
              WIJEKOON DISTRIBUTORS
            </h2>
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: -5,
              }}
            >
              <UserButton />
            </div>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <ScrollArea>
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {/* <Navbar /> */}
            <NavBarTesting />
          </div>
        </ScrollArea>
      </AppShell.Navbar>
      <ScrollArea>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </ScrollArea>
    </AppShell>
  );
}
