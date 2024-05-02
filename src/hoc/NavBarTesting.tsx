import { NavLink } from '@mantine/core';
import {
  IconBuilding,
  IconCash,
  IconDashboard,
  IconSettings,
  IconShoppingCart,
  IconTruck,
  IconUser,
  IconUserScan,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBarTesting() {
  const [activePath, setActivePath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const customerActivePaths = [
    '/admin/customers',
    '/admin/customers/add-edit',
    '/admin/customers/view',
    '/admin/customers/order-requests',
    '/admin/customers/add-order-requests',
    '/admin/customers/edit-order-requests',
    '/admin/customers/view-order-requests',
    '/admin/customers/orders',
    '/admin/customers/add-orders',
    '/admin/customers/edit-orders',
    '/admin/customers/view-orders',
    '/admin/customers/payments',
    '/admin/customers/add-payments',
    '/admin/customers/edit-payments',
    '/admin/customers/view-payments',
    '/admin',
  ];

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          // backgroundColor: '#5E1588',
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Dashboard"
            leftSection={<IconDashboard size="1rem" stroke={1.5} />}
            color="violet"
            variant="filled"
            active={activePath === '/admin/dashboard' || activePath === '/admin'}
          />
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Customers"
            leftSection={<IconUser size="1rem" stroke={1.5} />}
            variant="filled"
            color="violet"
            childrenOffset={28}
            active={customerActivePaths.includes(activePath)}
          >
            <Link to="/admin/customers" style={{ textDecoration: 'none' }}>
              <NavLink
                style={{ borderRadius: 5 }}
                label="Customers"
                variant="light"
                active={
                  activePath === '/admin/customers' ||
                  activePath === '/admin/customers/add-edit' ||
                  activePath === '/admin/customers/view'
                }
              />
            </Link>
            <Link to="/admin/customers/order-requests" style={{ textDecoration: 'none' }}>
              <NavLink
                style={{ borderRadius: 5 }}
                label="Customer Order Requests"
                active={
                  activePath === '/admin/customers/order-requests' ||
                  activePath === '/admin/customers/add-order-requests' ||
                  activePath === '/admin/customers/edit-order-requests' ||
                  activePath === '/admin/customers/view-order-requests'
                }
              />
            </Link>
            <Link to="/admin/customers/orders" style={{ textDecoration: 'none' }}>
              <NavLink
                style={{ borderRadius: 5 }}
                label="Customer Orders"
                active={
                  activePath === '/admin/customers/orders' ||
                  activePath === '/admin/customers/add-orders' ||
                  activePath === '/admin/customers/edit-orders' ||
                  activePath === '/admin/customers/view-orders'
                }
              />
            </Link>
            <Link to="/admin/customers/payments" style={{ textDecoration: 'none' }}>
              <NavLink
                style={{ borderRadius: 5 }}
                label="Customer Payments"
                active={
                  activePath === '/admin/customers/payments' ||
                  activePath === '/admin/customers/add-payments' ||
                  activePath === '/admin/customers/edit-payments' ||
                  activePath === '/admin/customers/view-payments'
                }
              />
            </Link>
          </NavLink>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Suppliers"
            leftSection={<IconShoppingCart size="1rem" stroke={1.5} />}
            variant="filled"
            color="violet"
            childrenOffset={28}
          >
            <Link to="/admin/suppliers" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Suppliers" />
            </Link>
            <Link to="/admin/products" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Products" />
            </Link>
            <Link to="/admin/supplier-order-requests" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Supplier Order Requests" color="violet" />
            </Link>
            <Link to="/admin/supplier-orders" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Supplier Orders" color="violet" />
            </Link>
            <Link to="/admin/supplier-payments" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Supplier Payments" color="violet" />
            </Link>
          </NavLink>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Assets"
            leftSection={<IconBuilding size="1rem" stroke={1.5} />}
            variant="filled"
            color="violet"
            childrenOffset={28}
          >
            <Link to="/admin/warehouses" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Warehouses" color="violet" />
            </Link>
            <Link to="/admin/vehicles" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Vehicles" color="violet" />
            </Link>
          </NavLink>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Employees"
            leftSection={<IconUserScan size="1rem" stroke={1.5} />}
            variant="filled"
            color="violet"
            childrenOffset={28}
          >
            <Link to="/admin/employees" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Employees" color="violet" />
            </Link>
            <Link to="/admin/job-roles" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Job Roles" color="violet" />
            </Link>
          </NavLink>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Trips"
            leftSection={<IconTruck size="1rem" stroke={1.5} />}
            variant="filled"
            color="violet"
            childrenOffset={28}
          >
            <Link to="/admin/trips" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Trips" color="violet" />
            </Link>
            <Link to="/admin/expenses" style={{ textDecoration: 'none' }}>
              <NavLink style={{ borderRadius: 5 }} label="Expenses" color="violet" />
            </Link>
          </NavLink>
        </Link>

        <Link to="/admin/cheques" style={{ textDecoration: 'none' }}>
          <NavLink
            style={{ borderRadius: 5 }}
            label="Cheques"
            color="violet"
            leftSection={<IconCash size="1rem" stroke={1.5} />}
            variant="filled"
          />
        </Link>
        <div>
          <hr style={{ color: 'gray' }} />
          <div>
            <Link to="/admin/settings" style={{ textDecoration: 'none' }}>
              <NavLink
                style={{ borderRadius: 5 }}
                label="Settings"
                color="violet"
                leftSection={<IconSettings size="1rem" stroke={1.5} />}
                variant="filled"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarTesting;
