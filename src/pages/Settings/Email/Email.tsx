import { hasPrivilege } from '@/helpers/utils/permissionHandler';
import {
  fetchCustomers,
  fetchCustomerOrderRequests,
  fetchCustomerOrders,
  fetchCustomerPayments,
  deleteCustomer,
} from '@/redux/slices/customerSlice';
import { fetchEmails, setEmail, updateEmail } from '@/redux/slices/settingSlice';
import { AppDispatch, RootState } from '@/redux/store';
import {
  Text,
  Grid,
  Button,
  Card,
  Divider,
  Pagination,
  SegmentedControl,
  Table,
  TextInput,
  Badge,
  Menu,
  Group,
  Modal,
  rem,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconDots, IconSearch, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Email() {
  const [opened, setOpened] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const emails = useSelector((state: RootState) => state.settings.emails);
  const status = useSelector((state: RootState) => state.settings.status);

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

  // for pagination
  const [activePage, setPage] = useState(1);
  const emailsPerPage = 10;

  // for search
  const [searchSegment, setSearchSegment] = useState('Name');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  // pagination
  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const start = (activePage - 1) * emailsPerPage;
  const end = start + emailsPerPage;

  // filtering customers based on search
  const filteredEmails = emails.filter((email: any) => {
    const value = searchSegment === 'Name' ? email.name : email.email;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayedEmails = filteredEmails.slice(start, end);

  const handleViewEdit = (email: any, action: any) => {
    // if (action === 'delete') {
    //   setCustomerToDelete(customer);
    //   setOpened(true);
    // } else {
    dispatch(setEmail(email));
    dispatch(updateEmail({ ...email, isRead: true })).unwrap();
    navigate('/admin/settings/emails/view');
    // }
  };

  const rows = displayedEmails.map((element: any, index: any) => (
    <Table.Tr key={element._id}>
      <Table.Td>{start + index + 1}</Table.Td> {/* Adjusted row number */}
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.subject}</Table.Td>
      {/* <Table.Td>{element.message}</Table.Td> */}
      <Table.Td>
        <Badge color={element?.isRead ? 'green' : 'yellow'} radius="xs" size="xs">
          {element.isRead ? 'READ' : 'NOT READ'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={100}>
          <Menu.Target>
            <IconDots style={{ cursor: 'pointer' }} />
          </Menu.Target>

          <Menu.Dropdown>
            {hasPrivilege('VIEW_EMAILS') && (
              <Menu.Item onClick={() => handleViewEdit(element, 'view')}>View</Menu.Item>
            )}
            {/* {hasPrivilege('DELETE_EMAILS') && (
              <Menu.Item onClick={() => handleViewEdit(element, 'delete')} color="red">
                Delete
              </Menu.Item>
            )} */}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>#</Table.Th>
      <Table.Th>Customer name</Table.Th>
      <Table.Th>Email</Table.Th>
      <Table.Th>Subject</Table.Th>
      {/* <Table.Th>Message</Table.Th> */}
      <Table.Th>Status</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  //   const handleDeleteEmail = async () => {
  //     try {
  //       await dispatch(deleteCustomer(emailToDelete._id)).unwrap();
  //       dispatch(fetchCustomers());
  //       setOpened(false);
  //       Notifications.show({
  //         title: 'Successful',
  //         message: 'Customer Deleted Successfully',
  //         icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
  //       });
  //     } catch (e: any) {
  //       setOpened(false);
  //       Notifications.show({
  //         title: 'Error',
  //         message: e.message,
  //         color: 'red',
  //         icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
  //       });
  //     }
  //   };

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
                Emails
              </Text>
            </div>
          </div>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Email', 'Name']}
                defaultValue="Name"
                onChange={setSearchSegment}
              />
              <TextInput
                size="xs"
                ml={10}
                rightSection={<IconSearch />}
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
              />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={10}>
                      <Text color="dimmed" align="center">
                        No data found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
            <Pagination
              total={Math.ceil(filteredEmails.length / emailsPerPage)}
              value={activePage}
              onChange={handlePageChange}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>

      {/* <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion">
        <Text>Are you sure you want to delete the email send by {emailToDelete?.email}?</Text>
        <Group position="right" mt="md">
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteEmail}>
            Confirm
          </Button>
        </Group>
      </Modal> */}
    </>
  );
}

export default Email;
