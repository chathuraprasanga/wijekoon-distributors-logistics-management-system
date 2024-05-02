import { Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ModalsProvider, modals } from '@mantine/modals';

function ViewCustomerOrderRequests() {
  const openCancelRequest = () =>
    modals.openConfirmModal({
      title: 'Cancel Order Request',
      // centered: true,
      children: (
        <Text size="sm">
          Please confirm to cancel this customer order request
        </Text>
      ),
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: "Cancel" },

    });

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
                View Customer Order Requests
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="lg" style={{ fontWeight: 'bold' }}>
              Customer Details
            </Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width={'35%'}>Chathura Prsanga</Table.Td>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Created Date:
                </Table.Td>
                <Table.Td width={'35%'}>29/03/2024</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width={'35%'}>077 9250108 / 075 0943040</Table.Td>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Created By:
                </Table.Td>
                <Table.Td width={'35%'}>Customer</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Email:
                </Table.Td>
                <Table.Td width={'35%'}>chathuraprasanga98@gmail.com</Table.Td>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Expected Date:
                </Table.Td>
                <Table.Td width={'35%'}>29/04/2024</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td width={'35%'}>
                  Godawele Watta, Kotikapola, Mawathagama, Kurunegala
                </Table.Td>
                <Table.Td width={'15%'} style={{ fontWeight: 'bold' }}>
                  Status:
                </Table.Td>
                <Table.Td width={'35%'}>
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
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Discount</Table.Th>
                <Table.Th>Line Total</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>KSL-20</Table.Td>
                <Table.Td>Keshara Super Lime</Table.Td>
                <Table.Td>20KG</Table.Td>
                <Table.Td>550.00</Table.Td>
                <Table.Td>300</Table.Td>
                <Table.Td>3%</Table.Td>
                <Table.Td>150000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>KTM-25</Table.Td>
                <Table.Td>Keshara Skim Coat</Table.Td>
                <Table.Td>25KG</Table.Td>
                <Table.Td>1100.00</Table.Td>
                <Table.Td>300</Table.Td>
                <Table.Td>4%</Table.Td>
                <Table.Td>330000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Sub Total:</Table.Td>
                <Table.Td>480000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Tax:</Table.Td>
                <Table.Td>0.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Discount:</Table.Td>
                <Table.Td>17700.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Net Total:</Table.Td>
                <Table.Td>462300.00</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color='red' onClick={openCancelRequest}>Cancel Request</Button>
            <Button ml={10} color='violet'>Confirm Request</Button>
            {/* <Button ml={10} color='teal'>Create Invoice</Button> */}
          </div>
        </Grid.Col>
      </Grid>
      </ModalsProvider>
    </>
  );
}

export default ViewCustomerOrderRequests;
