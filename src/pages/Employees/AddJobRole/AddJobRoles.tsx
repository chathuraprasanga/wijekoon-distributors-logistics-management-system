import { Button, Card, Grid, Table, Text, TextInput, rem } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import {
  createJobRole,
  fetchJobRoles,
  fetchPermissions,
  updateJobRole,
} from '@/redux/slices/employeeSlice';

interface Permission {
  _id: string;
  module: string;
  description: string;
  code: string;
}

function AddJobRoles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedJobRole = useSelector((state: RootState) => state.employees.jobRole);
  const permissionsList = useSelector((state: RootState) => state.employees.permissions);
  const status = useSelector((state: RootState) => state.employees.status);

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

  // const [jobRoleName, setJobRoleName] = useState<string>(selectedJobRole?.name || '');
  const [activePermissions, setActivePermissions] = useState<string[]>(
    selectedJobRole?.permissions || []
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPermissions());
    }
  }, [status, dispatch]);

  const jobRoleAddEditForm = useForm({
    initialValues: {
      name: selectedJobRole?.name || '',
      permissions: selectedJobRole?.permissions || [],
    },
    validate: {
      name: isNotEmpty('Name is required'),
      permissions: (value: string[]) =>
        Array.isArray(value) && value.length < 1 ? 'One permission minimally required' : null,
    },
  });

  const handlePermissionClick = (permission: string) => {
    if (activePermissions.includes(permission)) {
      setActivePermissions(activePermissions.filter((p) => p !== permission));
    } else {
      setActivePermissions([...activePermissions, permission]);
    }
  };

  const handleSave = async (values: any) => {
    const payload = {
      ...values,
      permissions: activePermissions,
    };

    try {
      await dispatch(createJobRole(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Job Role created successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      jobRoleAddEditForm.reset(); // Reset the form state
      dispatch(fetchJobRoles());
      navigate('/admin/jobRoles');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the job role',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (values: any) => {
    const payload = {
      ...values,
      permissions: activePermissions,
      id: selectedJobRole?._id,
    };

    try {
      await dispatch(updateJobRole(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Job Role updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      jobRoleAddEditForm.reset(); // Reset the form state
      dispatch(fetchJobRoles());
      navigate('/admin/jobRoles');
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the job role',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    jobRoleAddEditForm.setFieldValue('permissions', activePermissions);
  }, [activePermissions]);

  const tds = permissionsList.map((permission: Permission) => (
    <Table.Tr key={permission._id}>
      <Table.Td width="30%">
        <Text size="sm">{permission.module}</Text>
      </Table.Td>
      <Table.Td width="60%">{permission.description}</Table.Td>
      <Table.Td width="10%">
        <Button
          color={activePermissions.includes(permission.code) ? 'red' : 'violet'}
          size="xs"
          onClick={() => handlePermissionClick(permission.code)}
        >
          {activePermissions.includes(permission.code) ? 'Remove' : 'Add'}
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

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
                {!selectedJobRole ? 'Add' : 'Edit'} Job Role
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <form
        onSubmit={
          !selectedJobRole
            ? jobRoleAddEditForm.onSubmit(handleSave)
            : jobRoleAddEditForm.onSubmit(handleUpdate)
        }
      >
        <Grid>
          <Grid.Col>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <TextInput
                label="Role Name"
                withAsterisk
                placeholder="Enter Job Role Name"
                {...jobRoleAddEditForm.getInputProps('name')}
              />
              <div style={{ marginTop: 10 }}>
                <Table>
                  <Table.Tr>
                    <Table.Th>Module</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>

                  <Table.Tbody>{tds}</Table.Tbody>
                </Table>
              </div>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <Button style={{ float: 'right' }} type="submit">
              Save
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  );
}

export default AddJobRoles;
