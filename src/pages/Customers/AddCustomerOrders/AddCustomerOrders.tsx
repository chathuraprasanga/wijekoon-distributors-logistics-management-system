import {
  ActionIcon,
  Button,
  Card,
  Grid,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconCalendar, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddCustomerOrders() {
  const [value, setValue] = useState<Date | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="80%">
        <Text>Enter Payment Details</Text>
        <Table withColumnBorders withTableBorder withRowBorders>
          <Table.Tr>
            <Table.Th>Payment Method</Table.Th>
            <Table.Th>Bank</Table.Th>
            <Table.Th>Branch</Table.Th>
            <Table.Th>Chq no.</Table.Th>
            <Table.Th>Deposit Date</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="15%">
              <Select
                size="xs"
                placeholder="Pick value"
                data={[
                  { label: 'Cash', value: 'Cash' },
                  { label: 'Cheque', value: 'Cheque' },
                ]}
                defaultValue="Cash"
              />
            </Table.Td>
            <Table.Td>
              <TextInput
                size="xs"
                placeholder="Bank code"
              />
            </Table.Td>
            <Table.Td>
              <TextInput size="xs" placeholder="Branch code" />
            </Table.Td>
            <Table.Td>
              <TextInput size="xs" placeholder="Chq Number" />
            </Table.Td>
            <Table.Td>
              <DatePickerInput
                size="xs"
                placeholder="Deposit Date"
                value={value}
                onChange={setValue}
              />
            </Table.Td>
            <Table.Td>
              <TextInput size="xs" placeholder="Input placeholder" />
            </Table.Td>
            <Table.Td width={50}>
              <ActionIcon variant="light" color="red">
                <IconTrash />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Button size="xs">New Payment Method</Button>
            </Table.Td>
            <Table.Td>
              <Text size="xs">Outstanding:</Text>
            </Table.Td>
            <Table.Td>
              <TextInput size="xs" placeholder="" />
            </Table.Td>
            <Table.Td width={50}></Table.Td>
          </Table.Tr>
          <Table.Tr></Table.Tr>
        </Table>
        <Button size="xs" style={{ float: 'right' }} mt={10} mb={10}>
          Save
        </Button>
      </Modal>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Create Customer Order
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }} size="lg">
              Customer Details
            </Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Name:
                </Table.Td>
                <Table.Td>Chathura Prasanga</Table.Td>
                <Table.Td>
                  {/* <DatePickerInput
                    rightSection={<IconCalendar />}
                    size="xs"
                    placeholder="Pick expected date"
                    value={value}
                    onChange={setValue}
                  /> */}
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Phone:
                </Table.Td>
                <Table.Td>077 9250108</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Email:
                </Table.Td>
                <Table.Td>chathuraprasanga98@gmail.com</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width={150} style={{ fontWeight: 'bold' }}>
                  Address:
                </Table.Td>
                <Table.Td>Godawele Watta, Kotikapola, Mawathagama</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withTableBorder withColumnBorders>
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
                <Table.Td>
                  <TextInput size="xs" placeholder="KSL-20" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Super Lime" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="20KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" value="300" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="20" rightSection="%" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="150000.00" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput size="xs" placeholder="KSL-20" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Keshara Super Lime" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="20KG" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="Enter Quantity" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" rightSection="%" placeholder="Enter Discount" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="150000.00" variant="filled" />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <Button size="xs" style={{ width: '100%' }}>
                    Add Products
                  </Button>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Sub Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="300000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Tax:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="0.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Discount:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="60000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Net Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="240000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button style={{ float: 'right' }} onClick={open}>
            Go to Payments
          </Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddCustomerOrders;
