import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Menu,
  Modal,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput, DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconDots, IconSearch, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddSupplierOrders() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const [activePage, setPage] = useState(1);

  const elements = [
    {
      customer: 'Chathura Prasanga',
      bank: '7135',
      branch: '116',
      chequeNo: '123456',
      amount: '112500.00',
      depositDate: '03/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'John Doe',
      bank: '7147',
      branch: '101',
      chequeNo: '654321',
      amount: '75000.00',
      depositDate: '04/05/2024',
      status: 'NOT AVAILABLE',
    },
    {
      customer: 'Jane Smith',
      bank: '7159',
      branch: '205',
      chequeNo: '987654',
      amount: '90000.00',
      depositDate: '05/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'Michael Johnson',
      bank: '7162',
      branch: '312',
      chequeNo: '456789',
      amount: '80000.00',
      depositDate: '06/05/2024',
      status: 'NOT AVAILABLE',
    },
    {
      customer: 'Emily Brown',
      bank: '7173',
      branch: '408',
      chequeNo: '321654',
      amount: '95000.00',
      depositDate: '07/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'William Wilson',
      bank: '7185',
      branch: '513',
      chequeNo: '789456',
      amount: '70000.00',
      depositDate: '08/05/2024',
      status: 'NOT AVAILABLE',
    },
    {
      customer: 'Emma Martinez',
      bank: '7196',
      branch: '611',
      chequeNo: '987123',
      amount: '85000.00',
      depositDate: '09/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'Daniel Anderson',
      bank: '7209',
      branch: '702',
      chequeNo: '654987',
      amount: '100000.00',
      depositDate: '10/05/2024',
      status: 'NOT AVAILABLE',
    },
    {
      customer: 'Olivia Rodriguez',
      bank: '7211',
      branch: '808',
      chequeNo: '159753',
      amount: '120000.00',
      depositDate: '11/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'James Taylor',
      bank: '7223',
      branch: '901',
      chequeNo: '357951',
      amount: '110000.00',
      depositDate: '12/05/2024',
      status: 'NOT AVAILABLE',
    },
    {
      customer: 'Sophia Garcia',
      bank: '7235',
      branch: '103',
      chequeNo: '456123',
      amount: '125000.00',
      depositDate: '13/05/2024',
      status: 'AVAILABLE',
    },
    {
      customer: 'Benjamin Martinez',
      bank: '7247',
      branch: '207',
      chequeNo: '789321',
      amount: '130000.00',
      depositDate: '14/05/2024',
      status: 'NOT AVAILABLE',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.chequeNo}>
        <Table.Td>{element.customer}</Table.Td>
        <Table.Td>{element.bank}</Table.Td>
        <Table.Td>{element.branch}</Table.Td>
        <Table.Td>{element.chequeNo}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>{element.depositDate}</Table.Td>
        {/* <Table.Td>
          <Badge size="sm" radius="sm" color={element.status === 'AVAILABLE' ? 'green' : 'purple'}>
            {element.status}
          </Badge>
        </Table.Td> */}
        <Table.Td>
          <Button size="xs" onClick={close}>
            Select
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="80%">
        <Text fw="bold">Select Customer Cheque</Text>
        <div style={{ display: 'flex', marginTop: 10 }}>
          <Select
            size="sm"
            placeholder="Select Customer"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <DatePickerInput size="sm" clearable placeholder="Select Deposit Date" ml={10} />
          <TextInput placeholder="Enter the Amount" size="sm" ml={10} />
          <Button ml={10}>
            <IconSearch />
          </Button>
        </div>
        <Table withRowBorders withColumnBorders withTableBorder mt={10}>
          <Table.Tr></Table.Tr>
          <Table.Tr>
            <Table.Th>Customr</Table.Th>
            <Table.Th>Bank</Table.Th>
            <Table.Th>Branch</Table.Th>
            <Table.Th>Cheque No.</Table.Th>
            <Table.Th>Amout</Table.Th>
            <Table.Th>Deposit Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
          {rows}
        </Table>
        <Pagination
          total={elements.length / 10}
          value={activePage}
          onChange={setPage}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </Modal>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Add Supplier Order
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="md" style={{ fontWeight: 'bold' }}>
              Trip Details
            </Text>
            <Grid>
              <Grid.Col span={4}>
                <DateInput
                  value={value}
                  onChange={setValue}
                  label="Trip Date"
                  placeholder="Date input"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Select a Vehicle"
                  placeholder="Select a Vehicle"
                  data={['LC-3801 8500KG', 'LK 2604 7500KG', 'By Supplier']}
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Select a Driver"
                  placeholder="Select a Driver"
                  //   disabled= {}
                  data={['Indika', 'Mahinda', 'By Supplier']}
                />
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text style={{ fontWeight: 'bold' }}>Order Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Supplier Name:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">Keshara Minerals and Chemicals</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Phone:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">081 2536488 / 077 7123456</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Email:
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">kesharaminerals@chem.com</Text>
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td width="7.5%">
                  <Text size="sm" fw="bold">
                    Address
                  </Text>
                </Table.Td>
                <Table.Td width="35%">
                  <Text size="sm">BOI, Pallekelle, Kandy</Text>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
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
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>
                  <Text size="sm">Total Size: </Text>
                </Table.Td>
                <Table.Td>5500KG</Table.Td>
                <Table.Td>
                  <Text size="sm">Sub Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" value="300000.00" variant="filled" />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>
                  <Text size="sm">Capacity: </Text>
                </Table.Td>
                <Table.Td>8500KG</Table.Td>
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
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Payment Details</Text>
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
                  <TextInput size="xs" placeholder="Bank code" />
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
                  <Button size="xs">New Payment Detail</Button>
                  <Button size="xs" ml={10} color="violet" onClick={open}>
                    Customer Cheque
                  </Button>
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
          </Card>
          <Grid.Col>
            <div>
              <Button size="xs" style={{ float: 'right', width: 100 }} mt={10} mb={10}>
                Save
              </Button>
            </div>
          </Grid.Col>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddSupplierOrders;
