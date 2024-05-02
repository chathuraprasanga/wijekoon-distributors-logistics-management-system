import { Card, Grid, Select, Text, Divider } from '@mantine/core';
import { BarChart } from '@mantine/charts';
import React, { useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconBuildingBank,
  IconCashBanknoteOff,
  IconCreditCard,
  IconWallet,
} from '@tabler/icons-react';

function Dashboard() {
  const data = [
    { month: 'January', DirectSales: 1200, WarehoseSales: 900 },
    { month: 'February', DirectSales: 1900, WarehoseSales: 1200 },
    { month: 'March', DirectSales: 400, WarehoseSales: 1000 },
    { month: 'April', DirectSales: 1000, WarehoseSales: 200 },
  ];

  return (
    <>
      <div>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          Hello Chathura
        </Text>

        <div>
          <Grid>
            <Grid.Col span={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ alignContent: 'center' }}>Financial Values</Text>
                <MonthPickerInput
                  style={{
                    width: 290,
                    textAlign: 'right',
                  }}
                  placeholder="Pick a month"
                  clearable
                  size="xs"
                />
              </div>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card style={{ backgroundColor: '#5E1588' }}>
                    <IconWallet size={48} stroke={1} style={{ color: 'white' }} />
                  </Card>
                  <div>
                    <Text size="lg" style={{ marginLeft: 10, fontWeight: 'bold' }}>
                      Revenue
                    </Text>
                    <Text size="md" style={{ marginLeft: 10 }}>
                      LKR 534,000.00
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card style={{ backgroundColor: '#5E1588' }}>
                    <IconCashBanknoteOff size={48} stroke={1} style={{ color: 'white' }} />
                  </Card>
                  <div>
                    <Text size="lg" style={{ marginLeft: 10, fontWeight: 'bold' }}>
                      Expenses
                    </Text>
                    <Text size="md" style={{ marginLeft: 10 }}>
                      LKR 534,000.00
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card style={{ backgroundColor: '#5E1588' }}>
                    <IconBuildingBank size={48} stroke={1} style={{ color: 'white' }} />
                  </Card>
                  <div>
                    <Text size="lg" style={{ marginLeft: 10, fontWeight: 'bold' }}>
                      Debit
                    </Text>
                    <Text size="md" style={{ marginLeft: 10 }}>
                      LKR 534,000.00
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Card style={{ backgroundColor: '#5E1588' }}>
                    <IconCreditCard size={48} stroke={1} style={{ color: 'white' }} />
                  </Card>
                  <div>
                    <Text size="lg" style={{ marginLeft: 10, fontWeight: 'bold' }}>
                      Credit
                    </Text>
                    <Text size="md" style={{ marginLeft: 10 }}>
                      LKR 534,000.00
                    </Text>
                  </div>
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </div>
      </div>

      <Grid>
        <Grid.Col span={6}>
          <div>
            <Text>Numeric Values</Text>
            <Grid>
              <Grid.Col span={6} style={{ display: 'flex' }}>
                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        Customers
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        155
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        Suppliers
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        5
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        Employees
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        13
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        Vehicles
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        4
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>
              </Grid.Col>
            </Grid>
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ alignContent: 'center' }}>Stocks</Text>
              <Select
                style={{ width: 290 }}
                placeholder="Select a Warehose"
                data={['W1-Mawathagama', 'W2-Barandana', 'W3-Kurunegala', 'W4-Kandy']}
                defaultValue="W1-Mawathagama"
                size="xs"
              />
            </div>
            <Grid>
              <Grid.Col span={6} style={{ display: 'flex' }}>
                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        KSL-20
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        455
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        KSC-25
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        400
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        KTM-30
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        155
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <Text size="sm" style={{ fontWeight: 'bold' }}>
                        KDF-30
                      </Text>
                      <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                        55
                      </Text>
                    </div>
                  </Card>
                </Grid.Col>
              </Grid.Col>
            </Grid>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Grid>
            <Grid.Col span={8}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                    Total Sales
                  </Text>
                  <MonthPickerInput
                    style={{
                      width: 150,
                      textAlign: 'right',
                    }}
                    placeholder="Pick a month"
                    clearable
                    size="xs"
                    maxLevel="year"
                  />
                </div>

                <BarChart
                  h={390}
                  data={data}
                  dataKey="month"
                  series={[
                    { name: 'DirectSales', color: 'violet.6' },
                    { name: 'WarehoseSales', color: 'blue.6' },
                  ]}
                  tickLine="y"
                />
              </Card>
            </Grid.Col>
            <Grid.Col span={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="xl">Customer Order Requests</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>45</Text>
                <Divider my="md" />
                <Text size="xl">Customer Orders</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>45</Text>
                <Divider my="md" />
                <Text size="xl">Supplier Order Requests</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>45</Text>
                <Divider my="md" />
                <Text size="xl">Supplier Orders</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>45</Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Dashboard;
