import { Divider, NavLink } from '@mantine/core';
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
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBarTesting = React.memo(() => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const permissions = localStorage.getItem('permissions');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  function hasPermission(permission: any) {
    return permissions.includes(permission);
  }

  function hasAnyPermission(inputPermissions: any) {
    return inputPermissions.some((permission: any) => permissions.includes(permission));
  }

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

  const supplierActivePaths = [
    '/admin/suppliers',
    '/admin/suppliers/add-edit',
    '/admin/suppliers/view',
    '/admin/suppliers/order-requests',
    '/admin/suppliers/add-order-requests',
    '/admin/suppliers/edit-order-requests',
    '/admin/suppliers/view-order-requests',
    '/admin/suppliers/orders',
    '/admin/suppliers/add-orders',
    '/admin/suppliers/edit-orders',
    '/admin/suppliers/view-orders',
    '/admin/suppliers/payments',
    '/admin/suppliers/add-payments',
    '/admin/suppliers/edit-payments',
    '/admin/suppliers/view-payments',
    '/admin/suppliers/products',
    '/admin/suppliers/add-edit-products',
    '/admin/suppliers/view-products',
    '/admin',
  ];

  const assetsActivePaths = [
    '/admin/assets/warehouses',
    '/admin/assets/add-edit-warehouses',
    '/admin/assets/view-warehouses',
    '/admin/assets/warehouses/stock-receive',
    '/admin/assets/warehouses/stock-dispatch',
    '/admin/assets/warehouses/add-edit-orders',
    '/admin/vehicles',
    '/admin/vehicles/add-edit',
    '/admin/vehicles/view',
    '/admin',
  ];

  const employeesActivePaths = [
    '/admin/employees',
    '/admin/employees/add-edit',
    '/admin/employees/view',
    '/admin/jobRoles',
    '/admin/jobRoles/add',
    '/admin/jobRoles/view',
    '/admin/jobRoles',
    '/admin/jobRoles/add-edit',
    '/admin/jobRoles/view',
    '/admin',
  ];

  const tripsActivePaths = [
    '/admin/trips',
    '/admin/trips/add-edit',
    '/admin/trips/view',
    '/admin/expenses',
    '/admin/expenses/add-edit',
    '/admin/expenses/view',
    '/admin/expenses',
    '/admin',
  ];

  const chequesActivePaths = [
    '/admin/cheques',
    '/admin/cheques/add-edit',
    '/admin/cheques/view',
    '/admin',
  ];

  const settingsActivePaths = [
    '/admin/settings',
    '/admin/settings/profile',
    '/admin',
  ];

  const customers = ['ADD_CUSTOMERS', 'EDIT_CUSTOMERS', 'VIEW_CUSTOMERS', 'DELETE_CUSTOMERS'];
  const customerOrderRequests = [
    'ADD_CUSTOMER_ORDER_REQUESTS',
    'EDIT_CUSTOMER_ORDER_REQUESTS',
    'VIEW_CUSTOMER_ORDER_REQUESTS',
  ];
  const customerOrders = ['ADD_CUSTOMER_ORDERS', 'VIEW_CUSTOMER_ORDERS'];
  const customerPayments = ['EDIT_CUSTOMER_PAYMENTS', 'VIEW_CUSTOMER_PAYMENTS'];

  const allCustomerPermissions = [
    ...customers,
    ...customerOrderRequests,
    ...customerOrders,
    ...customerPayments,
  ];

  const suppliers = ['ADD_SUPPLIERS', 'EDIT_SUPPLIERS', 'VIEW_SUPPLIERS', 'DELETE_SUPPLIERS'];
  const products = ['ADD_PRODUCTS', 'EDIT_PRODUCTS', 'VIEW_PRODUCTS', 'DELETE_PRODUCTS'];
  const supplierOrderRequests = [
    'ADD_SUPPLIER_ORDER_REQUESTS',
    'EDIT_SUPPLIER_ORDER_REQUESTS',
    'VIEW_SUPPLIER_ORDER_REQUESTS',
    'DELETE_SUPPLIER_ORDER_REQUESTS',
  ];
  const supplierOrders = ['ADD_SUPPLIER_ORDERS', 'VIEW_SUPPLIER_ORDERS'];
  const supplierPayments = ['EDIT_SUPPLIER_PAYMENTS', 'VIEW_SUPPLIER_PAYMENTS'];

  const allSupplierPermissions = [
    ...suppliers,
    ...products,
    ...supplierOrderRequests,
    ...supplierOrders,
    ...supplierPayments,
  ];

  const warehouses = ['ADD_WAREHOUSES', 'EDIT_WAREHOUSES', 'VIEW_WAREHOUSES'];
  const vehicles = ['ADD_VEHICLES', 'EDIT_VEHICLES', 'VIEW_VEHICLES', 'DELETE_VEHICLES'];
  const allAssetsPermissions = [...warehouses, ...vehicles];

  const employees = ['ADD_EMPLOYEES', 'EDIT_EMPLOYEES', 'VIEW_EMPLOYEES', 'DELETE_EMPLOYEES'];
  const jobRoles = ['ADD_JOB_ROLES', 'EDIT_JOB_ROLES', 'DELETE_JOB_ROLES'];
  const allEmployeesPermissions = [...employees, ...jobRoles];

  const trips = ['VIEW_TRIPS'];
  const expenses = ['ADD_EXPENSES', 'EDIT_EXPENSES', 'VIEW_EXPENSES'];
  const allTripsPermissions = [...trips, ...expenses];

  const cheques = ['EDIT_CHEQUES'];
  const allChequesPermissions = [...cheques];

  const renderNavLink = useCallback(
    (to: any, label: any, icon: any, activePaths: any, children: any) => (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <NavLink
          style={{ borderRadius: 5 }}
          label={label}
          leftSection={icon}
          color="violet"
          variant="filled"
          childrenOffset={28}
          active={activePaths.includes(activePath)}
        >
          {children}
        </NavLink>
      </Link>
    ),
    [activePath]
  );

  return (
    <div style={{ width: '100%', height: '100%', padding: 10, fontWeight: 'bold', color: 'black' }}>
      {renderNavLink(
        '/admin/dashboard',
        'Dashboard',
        <IconDashboard size="1rem" stroke={1.5} />,
        ['/admin/dashboard', '/admin'],
        null
      )}

      {hasAnyPermission(allCustomerPermissions) &&
        renderNavLink(
          '/',
          'Customers',
          <IconUser size="1rem" stroke={1.5} />,
          customerActivePaths,
          <>
            {hasAnyPermission(customers) &&
              renderNavLink(
                '/admin/customers',
                'Customers',
                null,
                ['/admin/customers', '/admin/customers/add-edit', '/admin/customers/view'],
                null
              )}
            {hasAnyPermission(customerOrderRequests) &&
              renderNavLink(
                '/admin/customers/order-requests',
                'Customer Order Requests',
                null,
                [
                  '/admin/customers/order-requests',
                  '/admin/customers/add-order-requests',
                  '/admin/customers/edit-order-requests',
                  '/admin/customers/view-order-requests',
                ],
                null
              )}
            {hasAnyPermission(customerOrders) &&
              renderNavLink(
                '/admin/customers/orders',
                'Customer Orders',
                null,
                [
                  '/admin/customers/orders',
                  '/admin/customers/add-orders',
                  '/admin/customers/edit-orders',
                  '/admin/customers/view-orders',
                ],
                null
              )}
            {hasAnyPermission(customerPayments) &&
              renderNavLink(
                '/admin/customers/payments',
                'Customer Payments',
                null,
                [
                  '/admin/customers/payments',
                  '/admin/customers/add-payments',
                  '/admin/customers/edit-payments',
                  '/admin/customers/view-payments',
                ],
                null
              )}
          </>
        )}

      {hasAnyPermission(allSupplierPermissions) &&
        renderNavLink(
          '/',
          'Suppliers',
          <IconShoppingCart size="1rem" stroke={1.5} />,
          supplierActivePaths,
          <>
            {hasAnyPermission(suppliers) &&
              renderNavLink(
                '/admin/suppliers',
                'Suppliers',
                null,
                ['/admin/suppliers', '/admin/suppliers/add-edit', '/admin/suppliers/view'],
                null
              )}
            {hasAnyPermission(products) &&
              renderNavLink(
                '/admin/suppliers/products',
                'Products',
                null,
                [
                  '/admin/suppliers/products',
                  '/admin/suppliers/add-edit-products',
                  '/admin/suppliers/view-products',
                ],
                null
              )}
            {hasAnyPermission(supplierOrderRequests) &&
              renderNavLink(
                '/admin/suppliers/order-requests',
                'Supplier Order Requests',
                null,
                [
                  '/admin/suppliers/order-requests',
                  '/admin/suppliers/add-order-requests',
                  '/admin/suppliers/edit-order-requests',
                  '/admin/suppliers/view-order-requests',
                ],
                null
              )}
            {hasAnyPermission(supplierOrders) &&
              renderNavLink(
                '/admin/suppliers/orders',
                'Supplier Orders',
                null,
                [
                  '/admin/suppliers/orders',
                  '/admin/suppliers/add-orders',
                  '/admin/suppliers/edit-orders',
                  '/admin/suppliers/view-orders',
                ],
                null
              )}
            {hasAnyPermission(supplierPayments) &&
              renderNavLink(
                '/admin/suppliers/payments',
                'Supplier Payments',
                null,
                [
                  '/admin/suppliers/payments',
                  '/admin/suppliers/add-payments',
                  '/admin/suppliers/edit-payments',
                  '/admin/suppliers/view-payments',
                ],
                null
              )}
          </>
        )}

      {hasAnyPermission(allAssetsPermissions) &&
        renderNavLink(
          '/',
          'Assets',
          <IconBuilding size="1rem" stroke={1.5} />,
          assetsActivePaths,
          <>
            {hasAnyPermission(warehouses) &&
              renderNavLink(
                '/admin/assets/warehouses',
                'Warehouses',
                null,
                [
                  '/admin/assets/warehouses',
                  '/admin/assets/add-edit-warehouses',
                  '/admin/assets/view-warehouses',
                  '/admin/assets/warehouses/stock-receive',
                  '/admin/assets/warehouses/stock-dispatch',
                  '/admin/assets/warehouses/add-edit-orders',
                ],
                null
              )}
            {hasAnyPermission(vehicles) &&
              renderNavLink(
                '/admin/vehicles',
                'Vehicles',
                null,
                ['/admin/vehicles', '/admin/vehicles/add-edit', '/admin/vehicles/view'],
                null
              )}
          </>
        )}

      {hasAnyPermission(allEmployeesPermissions) &&
        renderNavLink(
          '/',
          'Employees',
          <IconUserScan size="1rem" stroke={1.5} />,
          employeesActivePaths,
          <>
            {hasAnyPermission(employees) &&
              renderNavLink(
                '/admin/employees',
                'Employees',
                null,
                ['/admin/employees', '/admin/employees/add-edit', '/admin/employees/view'],
                null
              )}
            {hasAnyPermission(jobRoles) &&
              renderNavLink(
                '/admin/jobRoles',
                'Job Roles',
                null,
                ['/admin/jobRoles', '/admin/jobRoles/add-edit', '/admin/jobRoles/view'],
                null
              )}
          </>
        )}

      {hasAnyPermission(allTripsPermissions) &&
        renderNavLink(
          '/',
          'Trips',
          <IconTruck size="1rem" stroke={1.5} />,
          tripsActivePaths,
          <>
            {hasAnyPermission(trips) &&
              renderNavLink(
                '/admin/trips',
                'Trips',
                null,
                ['/admin/trips', '/admin/trips/add-edit', '/admin/trips/view'],
                null
              )}
            {hasAnyPermission(expenses) &&
              renderNavLink(
                '/admin/expenses',
                'Expenses',
                null,
                ['/admin/expenses', '/admin/expenses/add-edit', '/admin/expenses/view'],
                null
              )}
          </>
        )}

      {hasAnyPermission(allChequesPermissions) &&
        renderNavLink(
          '/admin/cheques',
          'Cheques',
          <IconCash size="1rem" stroke={1.5} />,
          chequesActivePaths,
          null
        )}

      <Divider></Divider>

      {renderNavLink(
        '/admin/settings',
        'Settings',
        <IconSettings size="1rem" stroke={1.5} />,
        settingsActivePaths,
        null
      )}
    </div>
  );
});

export default NavBarTesting;
