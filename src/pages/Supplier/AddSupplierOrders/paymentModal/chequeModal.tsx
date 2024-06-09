import { Modal, Grid, Divider, TextInput, Table, Button, SegmentedControl } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingCheques, setPaymenets } from '@/redux/slices/chequesSlice';
import { RootState } from '@/redux/store';

function ChequeModal({ opened, onClose, payments }) {
  const [searchSegment, setSearchSegment] = useState('Amount');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const cheques = useSelector((state: RootState) => state.cheques.pendingCheques);

  useEffect(() => {
    dispatch(fetchPendingCheques());
  }, [dispatch]);

  const handleSelect = async (data) => {
    const payload: any = [
      {
        method: 'Cheque',
        bank: data.bank,
        branch: data.branch,
        chequeNumber: data.chequeNumber,
        depositDate: data.depositDate,
        amount: data.amount,
      },
    ];

    await dispatch(setPaymenets(payload));
  };

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Customers Cheque Details" size="90%">
        <Grid>
          <Grid.Col span={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SegmentedControl
                size="xs"
                color="violet"
                data={['Amount']}
                defaultValue="Amount"
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
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Bank</Table.Th>
                  <Table.Th>Branch</Table.Th>
                  <Table.Th>Cheque Number</Table.Th>
                  <Table.Th>Deposit Date</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {cheques.map((cheque) => (
                  <Table.Tr key={cheque?._id}>
                    <Table.Td>{cheque?.customer?.fullName}</Table.Td>
                    <Table.Td>{cheque?.bank}</Table.Td>
                    <Table.Td>{cheque?.branch}</Table.Td>
                    <Table.Td>{cheque?.chequeNumber}</Table.Td>
                    <Table.Td>{cheque?.depositDate?.split('T')[0]}</Table.Td>
                    <Table.Td>{cheque?.amount}</Table.Td>
                    <Table.Td>
                      <Button size="xs" onClick={() => handleSelect(cheque)}>
                        Select
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
}

export default ChequeModal;
