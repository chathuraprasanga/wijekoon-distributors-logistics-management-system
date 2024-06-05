import React, { useState } from 'react';
import { Modal, Table, Select, TextInput, ActionIcon, Button, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { setCustomerPayment } from '@/redux/slices/customerSlice';

// Define the type for the row data
interface RowData {
  method: string;
  bank: string;
  branch: string;
  chequeNumber: string;
  depositDate: Date;
  amount: string;
}

const PaymentModal = ({ customerOrder, totalPayable, opened, onClose }) => {
  const [payments, setPayments] = useState<RowData[]>([
    // { method: 'Cash', bank: '', branch: '', chequeNumber: '', depositDate: null, amount: '' },
  ]);
  const [outstanding, setOutstanding] = useState(totalPayable.toString());
  const [dates, setDates] = useState<Date[]>([]);
  console.log(payments, outstanding, dates);
  const dispatch = useDispatch();

  const paymentForm = useForm({
    initialValues: {
      paymentDetails: [
        { method: 'Cash', bank: '', branch: '', chequeNo: '', depositDate: '', amount: '' },
      ],
      outstanding: outstanding.toString(),
    },
    validate: {},
  });

  const addPaymentDetail = () => {
    setPayments((prevPayments) => [
      ...prevPayments,
      {
        method: 'Cash',
        bank: '',
        branch: '',
        chequeNumber: '',
        depositDate: new Date(),
        amount: 0,
      },
    ]);

    setDates((prevDates) => [...prevDates, new Date()]);
    // Recalculate outstanding amount after adding a new payment detail
    const newOutstanding = calculateOutstanding(totalPayable, payments);
    setOutstanding(newOutstanding.toString());
  };

  const removePaymentDetail = (index: number) => {
    setPayments((prevPayments) => prevPayments.filter((_, i) => i !== index));

    // Recalculate outstanding amount after removing a payment detail
    const newOutstanding = calculateOutstanding(totalPayable, payments);
    setOutstanding(newOutstanding.toString());
  };

  const handlePaymentChange = (index: number, field: keyof RowData, value: string) => {
    const updatedPayments = payments.map((payment, i) =>
      i === index ? { ...payment, [field]: value } : payment
    );

    setPayments(updatedPayments);

    // If updating the depositDate, update the dates state
    if (field === 'depositDate') {
      const newDates = dates.map((date, i) => (i === index ? new Date(value) : date));
      setDates(newDates);
    }

    // Recalculate outstanding amount after changing a payment detail
    const newOutstanding = calculateOutstanding(totalPayable, updatedPayments);
    setOutstanding(newOutstanding.toString());
  };

  const calculateOutstanding = (totalPayable, payments) =>
    parseFloat(totalPayable) -
      payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0) || 0;

  const handleSave = () => {
    const paymentPayload: any = {};

    // Map through the payments array to construct the paymentDetails object
    paymentPayload.paymentDetails = payments.map((payment) => ({
      method: payment.method,
      bank: payment.bank,
      branch: payment.branch,
      chequeNumber: payment.chequeNumber,
      depositDate: payment.depositDate.toISOString(), // Convert Date object to ISO string
      amount: payment.amount,
    }));

    paymentPayload.totalPayable = totalPayable;
    paymentPayload.outstanding = outstanding;
    paymentPayload.status = outstanding === '0' ? 'PAID' : 'NOT PAID';

    console.log(paymentPayload);
    dispatch(setCustomerPayment(paymentPayload));
    setDates([]);
    onClose();
  };

  const isCheque = (method: any) => method === 'Cheque';

  return (
    <>
      <Modal opened={opened} onClose={onClose} size="80%">
        <p>Enter Payment Details</p>
        <Table withColumnBorders withTableBorder withRowBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Payment Method</Table.Th>
              <Table.Th>Bank</Table.Th>
              <Table.Th>Branch</Table.Th>
              <Table.Th>Chq no.</Table.Th>
              <Table.Th>Deposit Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments.map((payment, index) => (
              <Table.Tr>
                <Table.Td width="15%">
                  <Select
                    size="xs"
                    placeholder="Pick value"
                    data={[
                      { label: 'Cash', value: 'Cash' },
                      { label: 'Cheque', value: 'Cheque' },
                    ]}
                    key={paymentForm.key('paymentDetails.method')}
                    value={payment.method}
                    onChange={(value) => handlePaymentChange(index, 'method', value)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    size="xs"
                    placeholder="Bank code"
                    disabled={!isCheque(payment.method)}
                    key={paymentForm.key('paymentDetails.bank')}
                    onChange={(event) =>
                      handlePaymentChange(index, 'bank', event.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    size="xs"
                    placeholder="Branch code"
                    disabled={!isCheque(payment.method)}
                    key={paymentForm.key('paymentDetails.branch')}
                    onChange={(event) =>
                      handlePaymentChange(index, 'branch', event.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    size="xs"
                    placeholder="Chq Number"
                    key={paymentForm.key('paymentDetails.chequeNumber')}
                    disabled={!isCheque(payment.method)}
                    onChange={(event) =>
                      handlePaymentChange(index, 'chequeNumber', event.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <DatePickerInput
                    size="xs"
                    placeholder="Deposit Date"
                    value={dates[index]} // Use the dates state here
                    disabled={!isCheque(payment.method)}
                    onChange={(value) => {
                      const newDates = dates.map((date, i) =>
                        i === index ? new Date(value) : date
                      );
                      setDates(newDates);
                      handlePaymentChange(index, 'depositDate', value);
                    }}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    size="xs"
                    placeholder="Amount"
                    key={paymentForm.key('paymentDetails.amount')}
                    onChange={(event) =>
                      handlePaymentChange(index, 'amount', event.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td width={50}>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => removePaymentDetail(index)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Button
                  size="xs"
                  onClick={addPaymentDetail}
                  disabled={payments.length > 0 && outstanding <= 0}
                >
                  New Payment Detail
                </Button>
              </Table.Td>
              <Table.Td>
                <Text size="xs">Outstanding:</Text>
              </Table.Td>
              <Table.Td>
                <TextInput size="xs" value={outstanding} readOnly />
              </Table.Td>
              <Table.Td width={50}></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <div style={{ textAlign: 'right', marginTop: '10px', marginBottom: '10px' }}>
          <Button size="xs" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
