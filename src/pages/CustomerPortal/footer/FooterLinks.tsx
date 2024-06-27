import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './FooterLinks.module.css';

const data = [
  {
    title: 'QuickLinks',
    links: [
      { label: 'Home', link: '/' },
      { label: 'Products', link: '/products' },
      { label: 'About Us', link: '/about-us' },
      { label: 'Contact Us', link: '/contact-us' },
    ],
  },
  {
    title: 'Extra Links',
    links: [
      { label: 'Ask Questions', link: '#' },
      { label: 'Admin login', link: 'http://localhost:5173/admin-login' },
      { label: 'Privacy Policy', link: '/privacy-policy' },
      { label: 'Terms of Use', link: '/terms-of-use' },
    ],
  },
  {
    title: 'Contact Info',
    links: [
      { label: '077 4139758' },
      { label: 'wijekoonDistributor@gmail.com' },
      { label: 'BOI Junction, Mawathagama, Kurunegala' },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* <MantineLogo size={30} /> */}
          <Text fw={'bold'}>WIJEKOON DISTRIBUTORS</Text>
          <Text size="xs" c="dimmed" className={classes.description}>
            Official Keshara Minerals and Chemicals Distributor
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2020 Xcorpion.dev. All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
