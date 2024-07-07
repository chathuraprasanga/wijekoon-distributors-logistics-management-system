import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './hoc/AppLayout';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Customers from './pages/Customers/Customers';
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
import Warehouses from './pages/Assets/Warehouses';
import ViewWarehouse from './pages/Assets/ViewWarehouse/ViewWarehouse';
import StockReceiveWarehouse from './pages/Assets/StockReeiveWarehouse/StockReceiveWarehouse';
import StockDispatchWarehouse from './pages/Assets/StockDispatchWarehouse/StockDispatchWarehouse';
import Vehicles from './pages/Assets/Vehicles/Vehicles';
import AddEditVehicles from './pages/Assets/AddEditVehicles/AddEditVehicles';
import ViewVehicles from './pages/Assets/ViewVehicles/ViewVehicles';
import Employees from './pages/Employees/Employees';
import AddEditEmployees from './pages/Employees/AddEditEmployee/AddEditEmployees';
import ViewEmployees from './pages/Employees/viewEmployees/ViewEmployees';
import JobRoles from './pages/Employees/JobRoles/JobRoles';
import AddJobRoles from './pages/Employees/AddJobRole/AddJobRoles';
import ViewJobRoles from './pages/Employees/ViewJobRoles/ViewJobRoles';
import Trips from './pages/Trips/Trips';
import AddEditTrips from './pages/Trips/AddEditTrips/AddEditTrips';
import ViewTrips from './pages/Trips/ViewTrips/ViewTrips';
import Expenses from './pages/Trips/Expenses/Expenses';
import ViewExpenses from './pages/Trips/ViewExpenses/ViewExpenses';
import AddEditExpenses from './pages/Trips/AddEditExpenses/AddEditExpenses';
import Cheques from './pages/Cheques/Cheques';
import ViewCheques from './pages/Cheques/ViewCheques/ViewCheques';
import AddEditCheques from './pages/Cheques/AddEditCheques/AddEditCheques';
import AddEditWarehouse from './pages/Assets/AddEditWarehouse/AddEditWarehouse';
import ViewSuppliersOrders from './pages/Supplier/ViewSupplierOrder/ViewSupplierOrder';
import AddWarehouseCustomerOrders from './pages/Assets/AddEditWarehouseOrder/AddEditWarehouseOrder';
import CustomerPortal from './pages/CustomerPortal/home';
import HomeNew from './pages/CustomerPortal/pages/Home';
import CustomerProducts from './pages/CustomerPortal/pages/Products';
import AboutUs from './pages/CustomerPortal/pages/AboutUs';
import ContactUs from './pages/CustomerPortal/pages/ContactUs';
import CustomerLogin from './pages/CustomerPortal/pages/CustomerLogin';
import CustomerSignUp from './pages/CustomerPortal/pages/CustomerSignUp';
import { element } from 'prop-types';
import { CustomerLayout } from './pages/CustomerPortal/Layout/CustomerLayout';
import CustomerDashboard from './pages/CustomerPortal/pages/CustomerDashboard';
import CustomerForgotPassword from './pages/CustomerPortal/pages/CustomerForgotPassword';
import CustomerRequest from './pages/CustomerPortal/pages/CustomerRequest';
import CustomerOrdersCP from './pages/CustomerPortal/pages/CustomerOrdersCP';
import CustomerOrderRequestsCP from './pages/CustomerPortal/pages/CustomerOrderRequestsCP';
import CustomerPaymentsCP from './pages/CustomerPortal/pages/CustomerPaymentsCP';
import CustomerCheques from './pages/CustomerPortal/pages/CustomerCheques';
import { NotFoundImage } from './components/NothingFoundImage/NothingFoundImag';
import { NothingFoundBackground } from './components/404/NothingFoundBackground';
import PrivacyPolicy from './pages/CustomerPortal/pages/PrivacyPolicy';
import TermsOfUse from './pages/CustomerPortal/pages/TermsOfUse';
import Profile from './pages/Settings/Profile/Profile';
import CustomerSettings from './pages/CustomerPortal/pages/CustomerSettings';
import Email from './pages/Settings/Email/Email';
import ViewEmail from './pages/Settings/Email/ViewEmail/ViewEmail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerPortal />,
    children: [
      {
        path: '',
        element: <HomeNew />,
      },
      {
        path: 'products',
        element: <CustomerProducts />,
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      },
      {
        path: 'contact-us',
        element: <ContactUs />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: 'terms-of-use',
        element: <TermsOfUse />,
      },
    ],
  },
  {
    path: 'customer-login',
    element: <CustomerLogin />,
  },
  {
    path: 'customer-signup',
    element: <CustomerSignUp />,
  },
  {
    path: 'customer-forgot-password',
    element: <CustomerForgotPassword />,
  },
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      {
        path: 'dashboard',
        element: <CustomerDashboard />,
      },
      {
        path: 'request',
        element: <CustomerRequest />,
      },
      {
        path: 'customer-requests',
        element: <CustomerOrderRequestsCP />,
      },
      {
        path: 'orders',
        element: <CustomerOrdersCP />,
      },
      {
        path: 'payments',
        element: <CustomerPaymentsCP />,
      },
      {
        path: 'cheques',
        element: <CustomerCheques />,
      },
      {
        path: 'settings',
        element: <CustomerSettings />,
      },
      {
        path: '*',
        element: <NotFoundImage />,
      },
    ],
  },
  {
    path: '/admin-login',
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
        path: 'suppliers/view-orders',
        element: <ViewSuppliersOrders />,
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
        path: 'assets/warehouses',
        element: <Warehouses />,
      },
      {
        path: 'assets/add-edit-warehouses',
        element: <AddEditWarehouse />,
      },
      {
        path: 'assets/view-warehouses',
        element: <ViewWarehouse />,
      },
      {
        path: 'assets/warehouses/stock-receive',
        element: <StockReceiveWarehouse />,
      },
      {
        path: 'assets/warehouses/stock-dispatch',
        element: <StockDispatchWarehouse />,
      },
      {
        path: 'assets/warehouses/add-edit-orders',
        element: <AddWarehouseCustomerOrders />,
      },
      {
        path: 'vehicles',
        element: <Vehicles />,
      },
      {
        path: 'vehicles/add-edit',
        element: <AddEditVehicles />,
      },
      {
        path: 'vehicles/view',
        element: <ViewVehicles />,
      },
      {
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'employees/add-edit',
        element: <AddEditEmployees />,
      },
      {
        path: 'employees/view',
        element: <ViewEmployees />,
      },
      {
        path: 'jobRoles',
        element: <JobRoles />,
      },
      {
        path: 'jobRoles/view',
        element: <ViewJobRoles />,
      },
      {
        path: 'jobRoles/add-edit',
        element: <AddJobRoles />,
      },
      {
        path: 'trips',
        element: <Trips />,
      },
      {
        path: 'trips/add-edit',
        element: <AddEditTrips />,
      },
      {
        path: 'trips/view',
        element: <ViewTrips />,
      },
      {
        path: 'expenses',
        element: <Expenses />,
      },
      {
        path: 'expenses/view',
        element: <ViewExpenses />,
      },
      {
        path: 'expenses/add-edit',
        element: <AddEditExpenses />,
      },
      {
        path: 'cheques',
        element: <Cheques />,
      },
      {
        path: 'cheques/add-edit',
        element: <AddEditCheques />,
      },
      {
        path: 'cheques/view',
        element: <ViewCheques />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'settings/profile',
        element: <Profile />,
      },
      {
        path: 'settings/emails',
        element: <Email />,
      },
      {
        path: 'settings/emails/view',
        element: <ViewEmail />,
      },
      // {
      //   path: 'customerOrder/addPayment',
      //   element: <PaymentModal opened close={false} modalRows />,
      // },
      {
        path: '*',
        element: <NothingFoundBackground />,
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
