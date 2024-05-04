import {
  rem,
  Grid,
  Card,
  Table,
  TextInput,
  Select,
  Textarea,
  Switch,
  Button,
  Text,
  SimpleGrid,
  Image,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { IconCheck, IconArrowLeft, IconImageInPicture } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

function AddEditProducts() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });
  const handleSave = () => {
    Notifications.show({
      title: 'Successfull',
      message: 'Product Added Succesfully',
      icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    });
  };

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
                Add Product
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form action="">
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td>
                <TextInput label="Product Code" withAsterisk placeholder="Enter Product Code" />
              </Table.Td>
              <Table.Td>
                <TextInput label="Product Name" withAsterisk placeholder="Enter Product Name" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput label="Product Name" withAsterisk placeholder="Enter Customer Email" />
              </Table.Td>
              <Table.Td>
                <Select
                  label="Supplier"
                  placeholder="Selet Supplier"
                  data={['Keshara Minerals and Chemicals']}
                  withAsterisk
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Customer Phone 01"
                  withAsterisk
                  placeholder="Enter Customer Primary Phone"
                />
              </Table.Td>
              <Table.Td>
                <TextInput label="Customer Phone 01" placeholder="Enter Customer Secondary Phone" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput label="Buying Price" withAsterisk placeholder="Enter Buying Price" />
              </Table.Td>
              <Table.Td>
                <TextInput label="Selling Price" placeholder="Enter Selling Price" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <div>
                  <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} maxFiles={1}>
                    <div style={{ textAlign: 'center' }}>
                      <IconImageInPicture style={{ textAlign: 'center' }} />
                    </div>
                    <Text ta="center">Drop a image here</Text>
                  </Dropzone>

                  <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                    {previews}
                  </SimpleGrid>
                </div>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <Textarea size="md" label="Notes" placeholder="Input placeholder" />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Switch
                  defaultChecked
                  color="violet"
                  labelPosition="left"
                  label="Status "
                  size="md"
                  radius="lg"
                />
              </Table.Td>
              <Table.Td style={{ display: 'flex', float: 'right' }}>
                <Link to="/admin/suppliers/products">
                  <Button
                    style={{ width: 100 }}
                    variant="filled"
                    color="violet"
                    size="sm"
                    onClick={handleSave}
                    type="submit"
                  >
                    Save
                  </Button>
                </Link>
              </Table.Td>
            </Table.Tr>
          </Table>
        </form>
      </Card>
    </>
  );
}

export default AddEditProducts;
