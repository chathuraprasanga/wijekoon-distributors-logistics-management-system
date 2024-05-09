import {
  Grid,
  Button,
  Text,
  Card,
  Divider,
  Pagination,
  SegmentedControl,
  Table,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function JobRoles() {
  const [activePage, setPage] = useState(1);
  const elements = [
    {
      jobRole: 'Super Admin',
      Permission: '20 Permission',
    },
  ];

  const rows = elements.slice(0, 10).map((element) => (
    <>
      <Table.Tr key={element.jobRole}>
        <Table.Td width="30%">{element.jobRole}</Table.Td>
        <Table.Td width="50%">{element.Permission}</Table.Td>
        <Table.Td width="20%">
          <div>
            <Link to="/admin/jobRoles/add-edit">
              <Button size="xs" color="violet">
                Edit
              </Button>
            </Link>
            <Button ml={10} size="xs" color="red">
              Delete
            </Button>
          </div>
        </Table.Td>
      </Table.Tr>
    </>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Job Role</Table.Th>
      <Table.Th>Permissions</Table.Th>
      <Table.Th>Action</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>Job Roles</Text>
            </div>
            <Link to="/admin/jobRoles/add-edit">
              <Button size="sm">Create Job Roles</Button>
            </Link>
          </div>
        </Grid.Col>
        <Grid.Col>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Job Role']}
                defaultValue="Job Role"
              />
              <TextInput size="xs" ml={10} rightSection={<IconSearch />} placeholder="Search" />
            </div>
            <Divider my="md" />
            <Table striped highlightOnHover>
              <Table.Thead>{ths}</Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
              total={elements.length / 10}
              value={activePage}
              onChange={setPage}
              mt={10}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              size="xs"
            />
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default JobRoles;
