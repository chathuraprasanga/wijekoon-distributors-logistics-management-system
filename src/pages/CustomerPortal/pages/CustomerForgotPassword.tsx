import {
  Paper,
  ActionIcon,
  CloseIcon,
  Center,
  Title,
  Table,
  Button,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';

function CustomerForgotPassword() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email address'),
    },
  });

  const handleSubmit = async (values: any) => {
    // Here you can handle the forgot password logic, e.g., sending a reset link to the email
    console.log(values);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2FKeshara%202.jpg?alt=media&token=4823813d-fa20-4eb8-81f7-6f6c1edf7006")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Paper radius="md" p="xl" withBorder shadow="md" style={{ maxWidth: 480, width: '100%' }}>
        <ActionIcon
          color="red"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          <CloseIcon />
        </ActionIcon>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Center>
            <Title order={2}>Forgot Password</Title>
          </Center>
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  required
                  mt="xs"
                  {...form.getInputProps('email')}
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <Button type="submit" fullWidth mt="md">
                  Submit
                </Button>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={2}>
                <Text>
                  <Link to="/customer-login">Go back to login</Link>{' '}
                </Text>
              </Table.Td>
            </Table.Tr>
          </Table>
        </form>
      </Paper>
    </div>
  );
}

export default CustomerForgotPassword;
