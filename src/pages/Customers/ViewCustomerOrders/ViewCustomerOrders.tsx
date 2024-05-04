import { Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewCustomerOrders() {
  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                View Customer Order
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Customer Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td width="35%">Chathura Prasanga</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td width="35%">0779250108/0750943040</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Email ID:
                </Table.Td>
                <Table.Td width="35%">chathuraprasanga98@gmail.com</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td width="35%">Godawele Watta, Kotikapola, Mawathagama, Kurunegla</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Order Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Date:
                </Table.Td>
                <Table.Td width="35%">13/04/2024</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Total Payment:
                </Table.Td>
                <Table.Td width="35%">125000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Order ID:
                </Table.Td>
                <Table.Td width="35%">WD-0089</Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Paid Amount:
                </Table.Td>
                <Table.Td width="35%">75000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="15%"></Table.Td>
                <Table.Td width="35%"></Table.Td>
                <Table.Td width="15%" style={{ fontWeight: 'bold' }}>
                  Outstanding:
                </Table.Td>
                <Table.Td width="35%">50000.00</Table.Td>
              </Table.Tr>
            </Table>
            <Table
              withColumnBorders
              withRowBorders
              withTableBorder
              mt={10}
              style={{ fontSize: 12 }}
            >
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
                <Table.Td>Keshara Super lime</Table.Td>
                <Table.Td>20KG</Table.Td>
                <Table.Td>500.00</Table.Td>
                <Table.Td>300</Table.Td>
                <Table.Td>20%</Table.Td>
                <Table.Td>120000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Sub Total:</Table.Td>
                <Table.Td>120000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Tax:</Table.Td>
                <Table.Td>5000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>Discount: </Table.Td>
                <Table.Td>30000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>30000.00</Table.Td>
                <Table.Td>125000.00</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Payment Details</Text>
            <Table
              withColumnBorders
              withRowBorders
              withTableBorder
              mt={10}
              style={{ fontSize: 12 }}
            >
              <Table.Tr>
                <Table.Th>Payment Method</Table.Th>
                <Table.Th>Bank</Table.Th>
                <Table.Th>Branch</Table.Th>
                <Table.Th>Chequ no.</Table.Th>
                <Table.Th>Amount</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Cheque</Table.Td>
                <Table.Td>7010</Table.Td>
                <Table.Td>116</Table.Td>
                <Table.Td>123456</Table.Td>
                <Table.Td>50000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Cash</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>-</Table.Td>
                <Table.Td>25000.00</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}>
                  {/* <Button size="xs">New Payment Details</Button> */}
                </Table.Td>
                <Table.Td>Outstanding</Table.Td>
                <Table.Td>25000.00</Table.Td>
              </Table.Tr>
            </Table>
            <div>
              <Link to="/admin/customers/add-payments"><Button style={{ width: '15%', marginTop: 10, float: 'right' }}>New Payment</Button></Link>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCustomerOrders;
