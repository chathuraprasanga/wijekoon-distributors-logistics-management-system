import { RootState } from '@/redux/store';
import { ActionIcon, Badge, Card, Grid, Table, Text } from '@mantine/core';
import { IconArrowLeft, IconMailForward } from '@tabler/icons-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function ViewEmail() {
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.settings.email);

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
              <Text size="md" style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                Emails
              </Text>
            </div>
          </div>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Table withTableBorder withColumnBorders>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td width={200}>
                    <Text>Name</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{email.name}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={200}>
                    <Text>Email</Text>
                  </Table.Td>
                  <Table.Td style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>{email.email}</Text>
                    <Link to="">
                      <ActionIcon variant="filled" aria-label="Settings">
                        <IconMailForward style={{ width: '70%', height: '70%' }} stroke={1.5} />
                      </ActionIcon>
                    </Link>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={200} style={{ alignContent: 'start' }}>
                    <Text>Subject</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{email.subject}</Text>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td width={200}>
                    <Text>Message</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text>{email?.message}</Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewEmail;
