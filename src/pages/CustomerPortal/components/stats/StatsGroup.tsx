import { Text } from '@mantine/core';
import classes from './StatsGroup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchCustomerChequesByCustomerId,
  fetchCustomerOrderRequestsById,
  fetchCustomerOrdersById,
  fetchCustomerPaymentsById,
} from '@/redux/slices/customerPortalSlice';
import { RootState } from '@/redux/store';

export function StatsGroup() {
  const dispatch = useDispatch();
  const customer = useSelector((state: RootState) => state.customerPortal.customerDetails);
  const requests = useSelector((state: RootState) => state.customerPortal.customerOrderRequests);
  const orders = useSelector((state: RootState) => state.customerPortal.customerOrders);
  const payments = useSelector((state: RootState) => state.customerPortal.customerPayments);
  const cheques = useSelector((state: RootState) => state.customerPortal.customerCheques);

  useEffect(() => {
    if (customer?._id) {
      dispatch(fetchCustomerOrderRequestsById(customer._id));
      dispatch(fetchCustomerOrdersById(customer._id));
      dispatch(fetchCustomerPaymentsById(customer._id));
      dispatch(fetchCustomerChequesByCustomerId(customer._id));
    }
  }, [dispatch, customer?._id]);

  const data = [
    {
      title: 'Your Order Requests',
      stats: `${requests?.length || 0}`,
      description: 'The count of your order requests that you requested all the time',
    },
    {
      title: 'Your Orders',
      stats: `${orders?.length || 0}`,
      description: 'The count of the orders which dispatched to you',
    },
    {
      title: 'Your Payments',
      stats: `${payments?.length || 0}`,
      description: 'Your payment details which related to your orders',
    },
    {
      title: 'Your Cheques',
      stats: `${cheques?.length || 0}`,
      description: 'The Total Count of Cheques You have used to Payments',
    },
  ];

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));

  return <div className={classes.root}>{stats}</div>;
}
