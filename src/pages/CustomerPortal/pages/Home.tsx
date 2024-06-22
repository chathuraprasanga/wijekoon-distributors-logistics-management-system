import { RootState } from '@/redux/store';
import { Button, Text, Image, Card, Grid, Group } from '@mantine/core';
import React, { useEffect } from 'react';
import { Badge, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function HomeNew() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate('/admin-login'); // Assuming you want to navigate to '/admin-login'
  };

  return (
    <>
      <div>
        <Carousel style={{ marginTop: '-119px', height: '50vh%' }}>
          <Carousel style={{}}>
            <Carousel.Item interval={10000} timeout={10000}>
              <Image
                radius="md"
                h={520}
                // w={200}
                src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%202.jpg?alt=media&token=4823813d-fa20-4eb8-81f7-6f6c1edf7006"
              />
              <Carousel.Caption
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '48px', // Adjusted to match the first slide
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                }}
              >
                <h1>Distributing Around the North - West</h1>
                <p>WIJEKOON DISTRIBUTORS</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000} timeout={10000}>
              <Image
                radius="md"
                h={520}
                // w={200}
                src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fhome-slide-6.jpg?alt=media&token=499f5ba5-d8a0-462c-8342-6160f250bf6a"
              />
              <Carousel.Caption
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '48px', // Adjusted to match the first slide
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                }}
              >
                <h1>Discover the New Products</h1>
                <p>EXCELLENT QUALITY</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000} timeout={1000}>
              <Image
                radius="md"
                h={520}
                // w={'100'}
                src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fhome-slide-5.jpg?alt=media&token=89c28a1f-785b-46e4-a8bc-80818e461d0e"
              />
              <Carousel.Caption
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '48px', // Adjusted to match the first slide
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                }}
              >
                <h1>Have Many Products Agriculture Also</h1>
                <p>EXCELLENT QUALITY</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Carousel>
      </div>

      {/* <div>
        <Image
          mt={-120}
          radius="md"
          h={420}
          src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%202.jpg?alt=media&token=4823813d-fa20-4eb8-81f7-6f6c1edf7006"
        />
      </div> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: 20,
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <div style={{ flex: 1, marginRight: '10px' }}>
            <Image
              radius="md"
              h={200}
              w={200}
              src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%203.jpg?alt=media&token=8aa012fd-38e3-44ae-b7d2-5d97f3776f8b"
            />
          </div>

          <div>
            <h3>Wijekoon Distributors</h3>
            <p>
              Wijekoon distributors is a medium scale company which distributing products of Keshara
              minerals and chemical (PVT)ltd. Since 2000. The company is distributing the products
              in north western province.
            </p>
            <a href="/about-us">
              <Button radius={'md'}>Read more</Button>
            </a>
          </div>
        </Card>
        <Card
          shadow="sm"
          padding="xl"
          component="a"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <div style={{ flex: 1, marginRight: '10px' }}>
            <Image
              radius="md"
              h={200}
              w={200}
              src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara.jpg?alt=media&token=c7202228-b9d1-4cf1-84f7-3b853e6521e4"
            />
          </div>
          <div>
            <h3>Keshara Minerals and Chemicals</h3>
            <p>
              Keshara Minerals & Chemicals Kandy is a leading Minerals & Chemicals Manufacturers in
              Kandy, started 1994 as a small business, Today the company owns 5 large factories.
              Manufactures limestone related products
            </p>
            <a href="/about-us">
              <Button radius={'md'}>Read more</Button>
            </a>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size="xl" fw="bold">
            Main Products
          </Text>
        </div>
        <Grid style={{ marginLeft: 100, marginRight: 100, marginTop: 10, marginBottom: -100 }}>
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fproduct1.jpg?alt=media&token=555014db-9993-4d2f-a16f-c81ec23b1657"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Keshara Super Lime</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={5}>
                Keshara Super Powdered Lime which is fully manufactured with modern technology and
                machines. Powdered Lime was our initiating product of ours and from the beginning to
                date we have maintained the super quality of our powered lime product.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Go to Products
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fproduct2.jpg?alt=media&token=7a66cfbc-f926-4dd4-a627-e4e3d9423b59"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Keshara Skim Coat</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={5}>
                Skim Coat is an established top-level product in the market that consistently
                undergoes rigorous research and development with the aim of environmental protection
                and efficiency. Leading to its earned reputation in the market as a forerunner
                amongst imported and other local brands of skim coat.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Go to Products
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fproduct3.jpg?alt=media&token=3567de3f-c884-420d-85b2-276649a4454d"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Keshara Tile Master</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={5}>
                Ideal for use with any kind of tile, and any form of construction, Keshara Tile
                Master adhesive provides long-lasting, safe, and secure adhesion and is made using
                raw materials of the highest quality.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Go to Products
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={3}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fproduct4.jpg?alt=media&token=34c55382-3674-4514-b6b1-bb6f615072e3"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Keshsra Dollamite Fertilizer</Text>
                <Badge color="pink">On Sale</Badge>
              </Group>

              <Text size="sm" c="dimmed" lineClamp={5}>
                As verified by several independent market studies, Keshara Lime industries branded
                Dolomite packs, have swept away many unbranded inferior fertilizers. Keshara
                Dolomite fertilizer is also uniquely renowned for being a product that the company
                itself has tested and used in its own in-house cultivations and crops as a testament
                to its effectiveness.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Go to Products
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </div>

      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text size="xl" fw="bold">
          Welcome To Wijekoon Distributors Customer Portal
        </Text>
        <Text>This Page Under Development</Text>
        <hr />
        <Button onClick={handleAdmin}>Are you Admin?</Button>
      </div> */}
    </>
  );
}

export default HomeNew;
