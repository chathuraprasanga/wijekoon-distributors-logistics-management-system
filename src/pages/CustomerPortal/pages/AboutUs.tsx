import React, { useState } from 'react';
import {
  Button,
  Text,
  Image,
  Card,
  Grid,
  Group,
  Container,
  Paper,
  Title,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@mantine/core';
import { Col, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';

function AboutUs() {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const gallery = [
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fphoto.jpg?alt=media&token=4e8cdef7-ab1b-43b0-a130-8cd18c650c15',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fphoto1.jpg?alt=media&token=1ef67cda-b0ac-496a-b4ba-0d1b52c37b22',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fphoto2.jpg?alt=media&token=ce1743e0-7b20-41b9-9f2e-ac649bdeebaf',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fphoto4.jpg?alt=media&token=2798d685-606c-48e3-84ad-b1d678e5c6bb',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fhansi%20(lanka).jpg?alt=media&token=97f2d822-b217-4c24-aa04-8159e69a31c2',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fphoto3.jpg?alt=media&token=d545d02d-2498-448e-a006-16929194b77c',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%203.jpg?alt=media&token=8aa012fd-38e3-44ae-b7d2-5d97f3776f8b',
    'https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fhome-slide-4.jpg?alt=media&token=45cb47c9-799a-4974-8315-b513be25a0b8',
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

  return (
    <>
      <div>
        <Image
          mt={-120}
          radius="md"
          h={420}
          src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fheading2.jpg?alt=media&token=1056b348-308a-4caf-afbc-91a6e084fce3"
        />
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
          <Text fw={'bold'} style={{ fontSize: 48 }}>
            About Us
          </Text>
        </div>

        <div style={{ marginLeft: 150, marginRight: 150, marginTop: 20 }}>
          <>
            <section className="about">
              <Col span={12}>
                <Paper padding="md" shadow="xs" display={'flex'}>
                  <div className="image">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%203.jpg?alt=media&token=8aa012fd-38e3-44ae-b7d2-5d97f3776f8b"
                      alt=""
                      style={{ width: 520, borderRadius: 10, margin: 20 }}
                    />
                  </div>

                  <div className="content" style={{ margin: 20 }}>
                    <Title order={3}>Wijekoon Distributors</Title>
                    <Text>
                      Wijekoon distributors is the official distributor of Keshara minerals and
                      chemicals products in the northwest province in Sri Lanka since 2000. The
                      company was started at the beginning of Keshara minerals and chemicals.
                      Currently, there are numerous customers around the province. The customers of
                      the company are hardware stores in the northwest province. Most of them are in
                      the Kurunegala district due to the company's location in Mawathagama in
                      Kurunegala. Also, there are considerable customers in the Puttalam district.
                    </Text>
                  </div>
                </Paper>
              </Col>
            </section>

            <section className="about" style={{ marginTop: 50 }}>
              <Col span={12}>
                <Paper padding="md" shadow="xs" display={'flex'}>
                  <div className="content" style={{ margin: 20 }}>
                    <Title order={3}>Keshara Minerals and Chemicals</Title>
                    <Text>
                      Keshara Minerals & Chemicals Kandy is a leading Minerals & Chemicals
                      Manufacturer in Kandy, started in 1994 as a small business. Today, the company
                      owns 5 large factories. It manufactures limestone-related products. The
                      products of this company are in great demand. It is a well-known name among
                      the people. Currently, products are available island-wide. The product is also
                      exported to overseas markets.
                    </Text>
                  </div>

                  <div className="image">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara.jpg?alt=media&token=c7202228-b9d1-4cf1-84f7-3b853e6521e4"
                      alt=""
                      style={{ width: 520, borderRadius: 10, margin: 20 }}
                    />
                  </div>
                </Paper>
              </Col>
            </section>

            {/* Products Section */}
            <section className="products" style={{ marginTop: 50, marginBottom: -60 }}>
              <Container>
                <Title order={2} align="center">
                  Gallery
                </Title>
                <div className="box-container" style={{ marginTop: 20 }}>
                  <Grid>
                    {gallery.map((imageUrl, index) => (
                      <Grid.Col span={4} key={index}>
                        <Card
                          shadow="sm"
                          padding="xl"
                          component="a"
                          onClick={() => handleImageClick(imageUrl)}
                        >
                          <Card.Section>
                            <Image src={imageUrl} h={200} alt={`Gallery Image ${index + 1}`} />
                          </Card.Section>
                        </Card>
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              </Container>
            </section>
          </>
        </div>
      </div>

      <Modal opened={modalOpened} onClose={handleCloseModal} title="View Image">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={selectedImage} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AboutUs;
