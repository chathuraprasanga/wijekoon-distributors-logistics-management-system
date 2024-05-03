import { Grid, Card, Table, Badge, Button, Text, TextInput } from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewSupplierOrderRequests() {
  //   const openCancelRequest = () =>
  //     modals.openConfirmModal({
  //       title: 'Cancel Order Request',
  //       // centered: true,
  //       children: <Text size="sm">Please confirm to cancel this customer order request</Text>,
  //       confirmProps: { color: 'red' },
  //       labels: { confirm: 'Confirm', cancel: 'Cancel' },
  //     });

  return (
    <>
      <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
        <Grid>
          <Grid.Col span={12}>
            <div>
              <div style={{ display: 'flex' }}>
                <Link to={-1}>
                  <IconArrowLeft />
                </Link>
                <Text size="md" style={{ fontWeight: 'bold' }}>
                  View Supplier Order Requests
                </Text>
              </div>
              <div></div>
            </div>
          </Grid.Col>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="lg" style={{ fontWeight: 'bold' }}>
                Supplier Details
              </Text>
              <Table withRowBorders={false}>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Name:
                  </Table.Td>
                  <Table.Td width="35%">Keshara Minerals and Chemicals</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Created Date:
                  </Table.Td>
                  <Table.Td width="35%">29/03/2024</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Phone:
                  </Table.Td>
                  <Table.Td width="35%">077 9250108 / 075 0943040</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Purpose:
                  </Table.Td>
                  <Table.Td width="35%">For Delivery</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Email:
                  </Table.Td>
                  <Table.Td width="35%">chathuraprasanga98@gmail.com</Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Expected Date:
                  </Table.Td>
                  <Table.Td width="35%">29/04/2024</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Address:
                  </Table.Td>
                  <Table.Td width="35%">
                    Godawele Watta, Kotikapola, Mawathagama, Kurunegala
                  </Table.Td>
                  <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                    Status:
                  </Table.Td>
                  <Table.Td width="35%">
                    <Badge size="sm" radius={5} color="yellow">
                      Pending
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>

          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Table withColumnBorders withRowBorders withTableBorder>
                <Table.Tr>
                  <Table.Th>Product Code</Table.Th>
                  <Table.Th>Product Name</Table.Th>
                  <Table.Th>Product Size</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Line Total</Table.Th>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>KSL-20</Table.Td>
                  <Table.Td>Keshara Super Lime</Table.Td>
                  <Table.Td>20KG</Table.Td>
                  <Table.Td>300</Table.Td>
                  <Table.Td>6000KG</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>KTM-25</Table.Td>
                  <Table.Td>Keshara Skim Coat</Table.Td>
                  <Table.Td>25KG</Table.Td>
                  <Table.Td>300</Table.Td>
                  <Table.Td>7500KG</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={3}></Table.Td>
                  <Table.Td>Total Quantity:</Table.Td>
                  <Table.Td>550</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td colSpan={3}></Table.Td>
                  <Table.Td>Total Size:</Table.Td>
                  <Table.Td>13500KG</Table.Td>
                </Table.Tr>
              </Table>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* <TextInput style={{ width: 500 }} placeholder="Input placeholder" /> */}
              <Button
                ml={10}
                color="red"
                onClick={() => {
                  modals.open({
                    title: 'Reject Supplier Order Request',
                    children: (
                      <>
                        <TextInput label="Reason" placeholder="Reason for Reject" data-autofocus />
                        <Button fullWidth onClick={() => modals.closeAll()} mt="md" color="red">
                          Reject
                        </Button>
                      </>
                    ),
                  });
                }}
              >
                Reject Request
              </Button>
              <Button ml={10} color="violet">
                Create Order
              </Button>
              {/* <Button ml={10} color='teal'>Confirm</Button> */}
            </div>
          </Grid.Col>
        </Grid>
      </ModalsProvider>
    </>
  );
}

export default ViewSupplierOrderRequests;
