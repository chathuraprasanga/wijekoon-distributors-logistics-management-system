const permissionsString = localStorage.getItem('permissions');
const permissions = permissionsString ? JSON.parse(permissionsString) : [];

export const hasPrivilege = (permission: string) => {
  try {
    return permissions.includes(permission);
  } catch (error) {
    console.error('Error checking privilege:', error);
    return false;
  }
};

export const hasAnyPrivilege = (permissionArray: string[]) => {
  try {
    return permissionArray.some((permission) => permissions.includes(permission));
  } catch (error) {
    console.error('Error checking privileges:', error);
    return false;
  }
};
