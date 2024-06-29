import { updateTrip } from '@/redux/slices/tripsSlice';
import { RootState } from '@/redux/store';
import { Badge, Button, Card, Grid, Table, Text, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewTrips() {
  const [value, setValue] = useState<Date | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trip = useSelector((state: RootState) => state.trips.trip);

  // due to the permission handler is not works
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];

  const hasPrivilege = (permission: string) => {
    try {
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking privilege:', error);
      return false;
    }
  };

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
  };

  const handleUpdate = async () => {
    const status = trip.status === 'ACTIVE' ? 'COMPLETED' : 'ACTIVE';

    const payload = { status, _id: trip._id, date: value || trip.date };
    try {
      await dispatch(updateTrip(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Trip Status Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      navigate('/admin/trips');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the Trip',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

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
                View Trip Details
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Trip Details</Text>
            <Table withRowBorders={false}>
              <Table.Tr>
                {trip.status !== 'CANCELLED' && (
                  <>
                    <Table.Th>Date:</Table.Th>
                    <Table.Td>{trip?.date?.split('T')[0]}</Table.Td>{' '}
                  </>
                )}
                {trip.status === 'CANCELLED' && (
                  <>
                    <Table.Th>Date:</Table.Th>
                    <Table.Td width="35%">
                      <DatePickerInput
                        size="xs"
                        placeholder="Set New Trip Date"
                        value={value}
                        onChange={setValue}
                      />
                    </Table.Td>
                  </>
                )}
                <Table.Th>Vehicle No.:</Table.Th>
                <Table.Td>{trip?.vehicle?.number}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Driver:</Table.Th>
                <Table.Td>{trip?.driver?.name}</Table.Td>
                <Table.Th>Purpose</Table.Th>
                <Table.Td style={{ textTransform: 'capitalize' }}>{trip?.purpose}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                {/* <Table.Th>Warehouse ID:</Table.Th>
                <Table.Td>-</Table.Td> */}
                <Table.Th>Status:</Table.Th>
                <Table.Td>
                  <Badge
                    color={
                      trip.status === 'ACTIVE'
                        ? 'green'
                        : trip.status === 'COMPLETED'
                          ? 'blue'
                          : 'red'
                    }
                    radius="xs"
                    size="xs"
                  >
                    {trip.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>

        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw="bold">Load Details</Text>
            <Table withColumnBorders withRowBorders withTableBorder>
              <Table.Tr>
                <Table.Th>Product Code</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Product Size</Table.Th>
                <Table.Th>Product Quantity</Table.Th>
                <Table.Th>Product Line Total</Table.Th>
              </Table.Tr>
              {trip?.supplierOrder?.supplierOrderRequest?.order.map((item: any) => (
                <Table.Tr key={item._id}>
                  <Table.Td>{item?.product?.code}</Table.Td>
                  <Table.Td>{item?.product?.name}</Table.Td>
                  <Table.Td>{item?.product?.size} KG</Table.Td>
                  <Table.Td>{item?.quantity}</Table.Td>
                  <Table.Td>{item?.lineSize} KG</Table.Td>
                </Table.Tr>
              ))}

              <Table.Tr>
                <Table.Td colSpan={3}></Table.Td>
                <Table.Td>Total Size</Table.Td>
                <Table.Td>{trip?.supplierOrder?.supplierOrderRequest?.totalSize} KG</Table.Td>
              </Table.Tr>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <div>
            {trip.status === 'CANCELLED' && (
              <Button style={{ float: 'right' }} onClick={handleUpdate}>
                Update
              </Button>
            )}
            {trip.status === 'ACTIVE' && (
              <Button style={{ float: 'right' }} onClick={handleUpdate}>
                Completed
              </Button>
            )}
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewTrips;
