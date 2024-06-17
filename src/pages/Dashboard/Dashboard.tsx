import { useNavigate } from 'react-router-dom';
import { Card, Grid, Select, Text, Divider, GridCol } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart } from '@mantine/charts';
import React, { useEffect, useState } from 'react';
import { MonthPickerInput } from '@mantine/dates';
import {
  IconBuildingBank,
  IconCashBanknoteOff,
  IconCreditCard,
  IconWallet,
} from '@tabler/icons-react';
import { RootState } from '@/redux/store';
import { fetchSummaryDetails } from '@/redux/slices/dashboardSlice';

function Dashboard() {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const summaryDetails = useSelector((state: RootState) => state.dashboard.summaryDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  console.log(selectedWarehouse);

  const warehouseDetails = summaryDetails.warehouseDetails;
  const monthlySales = summaryDetails.monthlyNetTotal;

  useEffect(() => {
    dispatch(fetchSummaryDetails());
  }, [dispatch]);

  // const handleWarehouseChange = (value: any) => {
  //   setSelectedWarehouse(value);
  // };

  // const data = [
  //   { month: 'January', DirectSales: 1200, WarehoseSales: 900 },
  //   { month: 'February', DirectSales: 1900, WarehoseSales: 1200 },
  //   { month: 'March', DirectSales: 400, WarehoseSales: 1000 },
  //   { month: 'April', DirectSales: 1000, WarehoseSales: 200 },
  // ];

  console.log(warehouseDetails);

  return (
    <>
      <div>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            display: 'flex',
            flexDirection: 'column',
            textTransform: 'capitalize',
          }}
        >
          Hello {userDetails?.name}
        </Text>

        <div>
          <Grid>
            <Grid.Col span={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text style={{ alignContent: 'center' }}>Financial Values</Text>
                {/* <MonthPickerInput
                  style={{
                    width: 290,
                    textAlign: 'right',
                  }}
                  placeholder="Pick a month"
                  clearable
                  size="xs"
                /> */}
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
                      LKR {summaryDetails?.revenue?.toFixed(2) || '-'}
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
                      LKR{' '}
                      {(
                        summaryDetails?.expenses?.supplierOrderRequestNetTotal +
                        summaryDetails?.expenses?.expensesTotalAmount
                      ).toFixed(2) || '-'}
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
                      LKR {summaryDetails?.debit?.toFixed(2) || '-'}
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
                      LKR {summaryDetails?.credit?.toFixed(2) || '-'}
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
                        {summaryDetails?.customers || '-'}
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
                        {summaryDetails?.suppliers || '-'}
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
                        {summaryDetails?.employees || '-'}
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
                        {summaryDetails?.vehicles || '-'}
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
              {/* <Select
                style={{ width: 290 }}
                placeholder="Select a Warehouse"
                data={warehouseDetails?.map((wh: any) => `${wh.warehouseId} - ${wh.city}`)}
                defaultValue=""
                onChange={handleWarehouseChange}
                size="xs"
              /> */}
            </div>
            <Grid>
              <Grid.Col span={6} style={{ display: 'flex' }}>
                {warehouseDetails?.map((item: any) => (
                  <Grid.Col span={6} style={{ display: 'flex' }}>
                    <Grid.Col span={12}>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <div
                          style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}
                        >
                          <Text size="sm" style={{ fontWeight: 'bold' }}>
                            {item.code}
                          </Text>
                          <Text size="xl" style={{ fontWeight: 'bolder', color: '#5E1588' }}>
                            {item.totalQuantity}
                          </Text>
                        </div>
                      </Card>
                    </Grid.Col>
                  </Grid.Col>
                ))}
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
                  {/* <MonthPickerInput
                    style={{
                      width: 150,
                      textAlign: 'right',
                    }}
                    placeholder="Pick a month"
                    clearable
                    size="xs"
                    maxLevel="year"
                  /> */}
                </div>

                <BarChart
                  h={390}
                  data={monthlySales}
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
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>
                  {summaryDetails?.customerOrderRequests || '-'}
                </Text>
                <Divider my="md" />
                <Text size="xl">Customer Orders</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>
                  {summaryDetails?.customerOrders || '-'}
                </Text>
                <Divider my="md" />
                <Text size="xl">Supplier Order Requests</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>
                  {summaryDetails?.supplierOrderRequests || '-'}
                </Text>
                <Divider my="md" />
                <Text size="xl">Supplier Orders</Text>
                <Text style={{ fontSize: 31, fontWeight: 'bold', color: '#5E1588' }}>
                  {summaryDetails?.supplierOrders || '-'}
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Dashboard;
