import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';

export function NotFoundImage() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2F404%20Error%20Page%20not%20Found%20with%20people%20connecting%20a%20plug-amico.svg?alt=media&token=0ca2fce9-930d-4147-adbd-4a4638c33793" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
        </div>
        {/* <Image src={image.src} className={classes.desktopImage} /> */}
      </SimpleGrid>
    </Container>
  );
}
