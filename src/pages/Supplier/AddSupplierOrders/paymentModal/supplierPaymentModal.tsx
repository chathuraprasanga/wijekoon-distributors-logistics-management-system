import React, { useEffect, useState } from 'react';
import { Modal, Table, Select, TextInput, ActionIcon, Button, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { setSupplierPayment } from '@/redux/slices/supplierSlice';
import ChequeModal from './chequeModal';
import { RootState } from '@/redux/store';

// Define the type for the row data
interface RowData {
  method: string;
  bank: string;
  branch: string;
  chequeNumber: string;
  depositDate: Date;
  amount: number;
}

const SupplierPaymentModal = ({ SupplierOrder, totalPayable, opened, onClose }) => {
  const [payments, setPayments] = useState<RowData[]>([
    // { method: 'Cash', bank: '', branch: '', chequeNumber: '', depositDate: null, amount: '' },
  ]);
  const [isChequeModalOpen, setIsChequeModalOpen] = useState(opened);
  const [outstanding, setOutstanding] = useState(totalPayable.toFixed(2));
  const [dates, setDates] = useState<Date[]>([]);
  console.log(payments, outstanding, dates);
  const dispatch = useDispatch();
  // const paymentData = useSelector((state: RootState) => state.cheques.payments);

  // useEffect(() => {
  //   if (paymentData) {
  //     setPayments((prevPayments) => [...prevPayments, ...paymentData]);
  //   }
  // }, [paymentData]);

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
        amount: 0.0,
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
    paymentPayload.payments = payments.map((payment) => ({
      method: payment.method,
      bank: payment.bank,
      branch: payment.branch,
      chequeNumber: payment.chequeNumber,
      depositDate: payment.depositDate.toISOString(), // Convert Date object to ISO string
      amount: payment.amount,
    }));

    paymentPayload.totalPayable = totalPayable;
    paymentPayload.outstanding = payments.length === 0 ? totalPayable : outstanding;
    paymentPayload.status =
      parseFloat(outstanding) === 0.0 ? (payments.length === 0 ? 'NOT PAID' : 'PAID') : 'NOT PAID';

    console.log(paymentPayload);
    dispatch(setSupplierPayment(paymentPayload));
    setDates([]);
    onClose();
  };

  const isCheque = (method: any) => method === 'Cheque';

  const openChequeModal = () => {
    setIsChequeModalOpen(true);
    onClose(); // This calls the function passed as a prop to close the parent modal
  };

  const closeChequeModal = () => setIsChequeModalOpen(false);

  return (
    <>
      <ChequeModal opened={isChequeModalOpen} onClose={closeChequeModal} payments={payments} />

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
                    value={payments[index].bank}
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
                    value={payments[index].branch}
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
                    value={payments[index].chequeNumber}
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
                    value={payments[index].amount}
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
                <Button
                  size="xs"
                  color="violet"
                  ml={10}
                  onClick={() => openChequeModal()}
                  disabled // improvements
                >
                  Set Customer Cheque
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

export default SupplierPaymentModal;
