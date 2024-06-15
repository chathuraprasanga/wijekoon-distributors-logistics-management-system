import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Table, Select, TextInput, ActionIcon, Button, Text, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCheck, IconTrash, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { RootState } from '@/redux/store';
import { fetchSupplierPayments, updateSupplierPayment } from '@/redux/slices/supplierSlice';

interface RowData {
  method: string;
  bank: string;
  branch: string;
  chequeNumber: string;
  depositDate: Date;
  amount: number;
}

const SupplierPaymentUpdateModal = ({
  supplierPayment,
  totalPayable,
  opened,
  onClose,
}: {
  SupplierOrder: any;
  totalPayable: number;
  opened: boolean;
  onClose: () => void;
}) => {
  const [outstanding, setOutstanding] = useState<number>(parseFloat(totalPayable?.toFixed(2)));

  const selectedPayment = useSelector((state: RootState) => state.suppliers.supplierPayment);
  console.log('SELECTED PAYMENT:', selectedPayment);
  const [payments, setPayments] = useState<RowData[]>(
    selectedPayment ? selectedPayment.payments : []
  );
  const [dates, setDates] = useState<Date[]>([
    selectedPayment.payments.map((item: any) => item.depositDate),
  ]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const paymentForm = useForm({
    initialValues: {
      paymentDetails: [selectedPayment.paymentDetails],
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
    const newOutstanding = calculateOutstanding(totalPayable, payments);
    setOutstanding(newOutstanding);
  };

  const removePaymentDetail = (index: number) => {
    setPayments((prevPayments) => prevPayments.filter((_, i) => i !== index));
    const newOutstanding = calculateOutstanding(totalPayable, payments);
    setOutstanding(newOutstanding);
  };

  const handlePaymentChange = (index: number, field: keyof RowData, value: string | Date) => {
    const updatedPayments = payments.map((payment, i) =>
      i === index
        ? { ...payment, [field]: typeof value === 'string' ? value : new Date(value).toISOString() }
        : payment
    );

    setPayments(updatedPayments);
    if (field === 'depositDate') {
      const newDates = dates.map((date, i) => (i === index ? new Date(value) : date));
      setDates(newDates);
    }

    const newOutstanding = calculateOutstanding(totalPayable, updatedPayments);
    setOutstanding(newOutstanding);
  };

  const calculateOutstanding = (totalPayable: number, payments: RowData[]) =>
    parseFloat(totalPayable) -
      payments.reduce((acc, payment) => acc + parseFloat(payment.amount), 0) || 0;

  const handleSave = async () => {
    const paymentPayload = {
      ...selectedPayment,
      payments: payments.map((payment) => ({
        method: payment.method,
        bank: payment.bank,
        branch: payment.branch,
        chequeNumber: payment.chequeNumber,
        depositDate: payment.depositDate,
        amount: payment.amount,
      })),
      totalPayable: totalPayable,
      outstanding: outstanding,
      status: outstanding === 0 ? 'PAID' : 'NOT PAID',
    };
    try {
      dispatch(updateSupplierPayment(paymentPayload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Payment details updated successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      setDates([]);
      paymentForm.reset();
      dispatch(fetchSupplierPayments());
      navigate('/admin/Suppliers/payments');
      onClose();
    } catch (e: any) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error Payment Details',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
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
                    value={payment.bank}
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
                    value={payment.branch}
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
                    value={payment.chequeNumber}
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
                    value={payment.amount}
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
                <TextInput size="xs" value={outstanding?.toFixed(2)} readOnly />
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

export default SupplierPaymentUpdateModal;
