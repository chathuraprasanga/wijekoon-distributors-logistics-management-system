import React from 'react';
import { Button, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function AddEditCheques() {
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
  return (
    <>
      <Text fw="bold" size="xl">
        This Page Under Development
      </Text>
      <Link to="/admin/dashboard">
        <Button> Click Here to go to Dashboard</Button>
      </Link>
    </>
  );
}

export default AddEditCheques;
