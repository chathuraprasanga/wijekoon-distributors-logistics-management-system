import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  Modal,
  Pagination,
  ScrollArea,
  SegmentedControl,
  Select,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowLeft, IconCalendar, IconMinus, IconPlus, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import imageSrc from './../../../assets/1by1.png';

function AddEditCustomerOrderRequests() {
  const [value, setValue] = useState<Date | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Products"
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        {/* Modal content */}
        <Grid>
          <Grid.Col span={6}>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="33%">
                  <Input placeholder="Product Name" />
                </Table.Td>
                <Table.Td width="33%">
                  <SegmentedControl
                    color="violet"
                    defaultValue="Product Name"
                    data={['Product Name', 'Supplier']}
                  />
                </Table.Td>
                <Table.Td width="33%">
                  <Select placeholder="Supplier" searchable data={['Product Name', 'Supplier']} />
                </Table.Td>
              </Table.Tr>
            </Table>

            <Table withRowBorders={false}>
              <ScrollArea h="100vh">
                <Table.Tr>
                  <Table.Td>
                    <Card withBorder style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    {/* <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconMinus />
                        </ActionIcon>
                      </Table.Td>
                    </Card> */}

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    {/* <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconMinus />
                        </ActionIcon>
                      </Table.Td>
                    </Card> */}

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconPlus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>
                  </Table.Td>
                </Table.Tr>
              </ScrollArea>
            </Table>
            <div>
              {/* <Pagination
              total={20 / 10}
              value={activePage}
              onChange={setPage}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            /> */}
            </div>
          </Grid.Col>

          <Grid.Col span={6}>
            <Table withRowBorders={false}>
              <Table.Tr>
                <Table.Td width="33%">
                  <Text>Added Products</Text>
                </Table.Td>
                <Table.Td width="33%"></Table.Td>
                <Table.Td width="33%">
                  <Input placeholder="Product Name" rightSection={<IconSearch />} />
                </Table.Td>
              </Table.Tr>
            </Table>

            <Table withRowBorders={false}>
              <ScrollArea h="100vh">
                <Table.Tr>
                  <Table.Td>
                    <Card withBorder style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconMinus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>

                    <Card withBorder mt={5} style={{ display: 'flex', flexDirection: 'row' }}>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <img src={imageSrc} width="100%" alt="" />
                      </Table.Td>
                      <Table.Td width={530}>
                        <Text size="xl">Keshara Super Lime 20KG </Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text size="sm">KSL-20</Text>
                          <Text size="lg">LKR 550.00</Text>
                        </div>
                      </Table.Td>
                      <Table.Td
                        width={80}
                        height={80}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <ActionIcon size="xl">
                          <IconMinus />
                        </ActionIcon>
                      </Table.Td>
                    </Card>
                  </Table.Td>
                </Table.Tr>
              </ScrollArea>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {/* <Pagination
              total={20 / 10}
              value={activePage}
              onChange={setPage}
              mt={14}
              style={{ display: 'flex', justifyContent: 'flex-start' }}
              size="xs"
            /> */}
              <Button color="red">Cancel</Button>
              <Button color="violet" ml={10} style={{ float: 'right' }}>
                Add Products
              </Button>
            </div>
          </Grid.Col>
        </Grid>
      </Modal>

      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex' }}>
              <Link to={-1}>
                <IconArrowLeft />
              </Link>
              <Text size="md" style={{ fontWeight: 'bold' }}>
                Add Customer Order Request
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
                  <DatePickerInput
                    rightSection={<IconCalendar />}
                    size="xs"
                    placeholder="Pick expected date"
                    value={value}
                    onChange={setValue}
                  />
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
              {/* <Table.Tr>
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
                  <TextInput size="xs" placeholder="Enter discount" rightSection="%" />
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="light" color="red">
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr> */}
              <Table.Tr>
                <Table.Td>
                  <Button size="xs" style={{ width: '100%' }} onClick={open}>
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
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Tax:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Discount:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td colSpan={5}></Table.Td>
                <Table.Td>
                  <Text size="sm">Net Total:</Text>
                </Table.Td>
                <Table.Td>
                  <TextInput size="xs" placeholder="550.00" disabled />
                </Table.Td>
                <Table.Td></Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Button style={{ float: 'right' }}>Save</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddEditCustomerOrderRequests;
