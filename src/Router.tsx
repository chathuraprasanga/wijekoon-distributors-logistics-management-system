import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';
import { AppLayout } from './hoc/AppLayout';
import Login from './pages/Login/Login';
import { HomePage } from './pages/Home.page';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Customers from './pages/Customers/Customers';
import App from './App';
import AddEditCustomers from './pages/Customers/AddEditCustomers/AddEditCustomers';
import Settings from './pages/Settings/Settings';
import ViewCustomers from './pages/Customers/ViewCustomers/ViewCustomers';
import CustomerOrderRequests from './pages/Customers/CustomerOrderRequests/CustomerOrderRequests';
import AddEditCustomerOrderRequests from './pages/Customers/AddCustomerOrderRequests/AddEditCustomerOrderRequests';
import CustomerOrders from './pages/Customers/CustomerOrders/CustomerOrders';
import AddCustomerOrders from './pages/Customers/AddCustomerOrders/AddCustomerOrders';
import ViewCustomerOrderRequests from './pages/Customers/ViewCustomerOrderRequests/ViewCustomerOrderRequests';
import ViewCustomerOrders from './pages/Customers/ViewCustomerOrders/ViewCustomerOrders';
import EditCustomerOrderRequests from './pages/Customers/EditCustomerOrderRequests/EditCustomerOrderRequests';
import CustomerPayments from './pages/Customers/CustomerPayments/CustomerPayments';
import AddCustomerPayments from './pages/Customers/AddCustomerPayments/AddCustomerPayments';
import ViewCustomerPayments from './pages/Customers/ViewCustomerPayments/ViewCustomerPayments';
import Suppliers from './pages/Supplier/Suppliers';
import AddEditSupplier from './pages/Supplier/AddEdit Supplier/AddEditSupplier';
import ViewSupplier from './pages/Supplier/ViewSupplier/ViewSupplier';
import SupplierOrderRequests from './pages/Supplier/SupplierOrderRequests/SupplierOrderRequests';
import SupplierOrders from './pages/Supplier/SupplierOrders/SupplierOrders';
import AddSupplierOrderRequests from './pages/Supplier/AddSupplierOrderRequests/AddSupplierOrderRequests';
import EditSupplierOrderRequests from './pages/Supplier/EditSupplierOrderRequests/EditSupplierOrderRequests';
import ViewSupplierOrderRequests from './pages/Supplier/ViewSupplierOrderRequests/ViewSupplierOrderRequests';
import AddSupplierOrders from './pages/Supplier/AddSupplierOrders/AddSupplierOrders';
import SupplierPayments from './pages/Supplier/SupplierPayments/SupplierPayments';
import ViewSupplierPayments from './pages/Supplier/ViewSupplierPayments.tsx/ViewSupplierPayments';
import Products from './pages/Supplier/Products/Products';
import AddEditProducts from './pages/Supplier/AddEditProducts/AddEditProducts';
import ViewProducts from './pages/Supplier/ViewProducts/ViewProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'customers',
        element: <Customers />,
      },
      {
        path: 'customers/add-edit',
        element: <AddEditCustomers />,
      },
      {
        path: 'customers/view',
        element: <ViewCustomers />,
      },
      {
        path: 'customers/order-requests',
        element: <CustomerOrderRequests />,
      },
      {
        path: 'customers/add-order-requests',
        element: <AddEditCustomerOrderRequests />,
      },
      {
        path: 'customers/edit-order-requests',
        element: <EditCustomerOrderRequests />,
      },
      {
        path: 'customers/view-order-requests',
        element: <ViewCustomerOrderRequests />,
      },
      {
        path: 'customers/orders',
        element: <CustomerOrders />,
      },
      {
        path: 'customers/add-orders',
        element: <AddCustomerOrders />,
      },
      {
        path: 'customers/view-orders',
        element: <ViewCustomerOrders />,
      },
      {
        path: 'customers/payments',
        element: <CustomerPayments />,
      },
      {
        path: 'customers/add-payments',
        element: <AddCustomerPayments />,
      },
      {
        path: 'customers/view-payments',
        element: <ViewCustomerPayments />,
      },
      {
        path: 'suppliers',
        element: <Suppliers />,
      },
      {
        path: 'suppliers/add-edit',
        element: <AddEditSupplier />,
      },
      {
        path: 'suppliers/view',
        element: <ViewSupplier />,
      },
      {
        path: 'suppliers/order-requests',
        element: <SupplierOrderRequests />,
      },
      {
        path: 'suppliers/add-order-requests',
        element: <AddSupplierOrderRequests />,
      },
      {
        path: 'suppliers/edit-order-requests',
        element: <EditSupplierOrderRequests />,
      },
      {
        path: 'suppliers/view-order-requests',
        element: <ViewSupplierOrderRequests />,
      },
      {
        path: 'suppliers/orders',
        element: <SupplierOrders />,
      },
      {
        path: 'suppliers/add-orders',
        element: <AddSupplierOrders />,
      },
      {
        path: 'suppliers/payments',
        element: <SupplierPayments />,
      },
      {
        path: 'suppliers/view-payments',
        element: <ViewSupplierPayments />,
      },
      {
        path: 'suppliers/products',
        element: <Products />,
      },
      {
        path: 'suppliers/add-edit-products',
        element: <AddEditProducts />,
      },
      {
        path: 'suppliers/view-products',
        element: <ViewProducts />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Login />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
