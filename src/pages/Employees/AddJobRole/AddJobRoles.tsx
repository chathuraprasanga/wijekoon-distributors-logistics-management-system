import { Button, Card, Grid, Table, Text, TextInput } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AddJobRoles() {
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
                Add Job Role
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <TextInput
              width="50%"
              label="Role Name"
              withAsterisk
              placeholder="Enter Job Role Name"
            />
            <div style={{ marginTop: 10 }}>
              <Table>
                <Table.Tr>
                  <Table.Th>Module</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="30%">
                    <Text size="sm">Employee</Text>
                  </Table.Td>
                  <Table.Td width="60%">
                    Create Employee | Edit Employee | Delete Employee | Deactive Employee
                  </Table.Td>
                  <Table.Td width="10%">
                    <Button color="violet" size="xs">
                      Add
                    </Button>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width="30%">
                    <Text size="sm">Job Role</Text>
                  </Table.Td>
                  <Table.Td width="60%">
                    Create Job Role | Edit Job Role | Delete Job Role | Deactive Job Role
                  </Table.Td>
                  <Table.Td width="10%">
                    <Button color="red" size="xs">
                      Remove
                    </Button>
                  </Table.Td>
                </Table.Tr>
              </Table>
            </div>
          </Card>
        </Grid.Col>
        <Grid.Col>
          <Button style={{ float: 'right' }}>Save</Button>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default AddJobRoles;
