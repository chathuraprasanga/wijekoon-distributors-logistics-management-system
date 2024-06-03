import { ActionIcon, Badge, Button, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMail } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { fetchJobRoles, setEmployee } from '@/redux/slices/employeeSlice';

function ViewEmployees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedEmployee = useSelector((state: RootState) => state.employees.employee);

  const handleUpdate = (employee:any) => {
    dispatch(setEmployee(employee));
    dispatch(fetchJobRoles());
    navigate('/admin/employees/add-edit');
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
                View Employees
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table withColumnBorders withRowBorders withTableBorder>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Employee ID:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">{selectedEmployee?.employeeId}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Name:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">{selectedEmployee?.name}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Phone:
              </Text>
            </Table.Td>
            <Table.Td width="40%">
              <Text size="sm">
                {selectedEmployee?.phone} | {selectedEmployee?.phoneSecondary}
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Email:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">{selectedEmployee?.email}</Text>
              <Text size="sm">
                <ActionIcon size="sm">
                  <IconMail size="xs" />
                </ActionIcon>
              </Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                NIC:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">{selectedEmployee?.nic}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Date of Birth:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">{selectedEmployee?.dateOfBirth?.split('T')[0]}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Address:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">{selectedEmployee?.address}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Job Role:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">{selectedEmployee?.jobRole?.name}</Text>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td width="10%">
              <Text size="sm" fw="bold">
                Status:
              </Text>
            </Table.Td>
            <Table.Td width="100%" display="flex" style={{ justifyContent: 'space-between' }}>
              <Text size="sm">
                <Badge color={selectedEmployee?.status === 'ACTIVE' ? 'green' : 'red'} radius="sm">
                  {selectedEmployee?.status}
                </Badge>
              </Text>
            </Table.Td>
          </Table.Tr>
        </Table>
      </Card>
      <div style={{ marginTop: 10 }}>
        <Button style={{ float: 'right' }} onClick={() => handleUpdate(selectedEmployee)}>
          Update Record
        </Button>
      </div>
    </>
  );
}

export default ViewEmployees;
