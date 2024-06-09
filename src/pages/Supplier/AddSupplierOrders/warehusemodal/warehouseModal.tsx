import { Modal, Select, Text, TextInput, Button, Table, Pagination } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

function warehouseModal() {
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} size="80%">
        <Text fw="bold">Select Customer Cheque</Text>
        <div style={{ display: 'flex', marginTop: 10 }}>
          <Select
            size="sm"
            placeholder="Select Customer"
            data={['React', 'Angular', 'Vue', 'Svelte']}
          />
          <DatePickerInput size="sm" clearable placeholder="Select Deposit Date" ml={10} />
          <TextInput placeholder="Enter the Amount" size="sm" ml={10} />
          <Button ml={10}>
            <IconSearch />
          </Button>
        </div>
        <Table withRowBorders withColumnBorders withTableBorder mt={10}>
          <Table.Tr></Table.Tr>
          <Table.Tr>
            <Table.Th>Customr</Table.Th>
            <Table.Th>Bank</Table.Th>
            <Table.Th>Branch</Table.Th>
            <Table.Th>Cheque No.</Table.Th>
            <Table.Th>Amout</Table.Th>
            <Table.Th>Deposit Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
          {tds}
        </Table>
        <Pagination
          total={cheques.length / 10}
          value={activePage}
          onChange={setPage}
          mt={10}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          size="xs"
        />
      </Modal>
    </>
  );
}

export default warehouseModal;
