import { Title, SimpleGrid, TextInput, Textarea, Group, Image, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

function ContactUs() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const handleSendMail = async (values:any) => {
    console.log("Sending email...", values);
    
    form.reset();
  };

  return (
    <>
      <div>
        <Image
          mt={-120}
          radius="md"
          h={420}
          src="https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/Landing%20Page%2Fheading1.jpg?alt=media&token=2403baf9-40b4-462d-a950-1a693cded54e"
        />
      </div>

      <form style={{ marginLeft: 300, marginRight: 300, marginBottom: -60 }} onSubmit={form.onSubmit(handleSendMail)}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center"
        >
          Get in touch
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('message')}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </form>
    </>
  );
}
export default ContactUs;
