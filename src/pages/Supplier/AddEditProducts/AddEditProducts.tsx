import React, { useEffect, useState } from 'react';
import {
  rem,
  Grid,
  Card,
  Table,
  TextInput,
  Select,
  Textarea,
  Button,
  Text,
  SimpleGrid,
  Image,
} from '@mantine/core';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { isNotEmpty, useForm } from '@mantine/form';
import { Notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconArrowLeft,
  IconImageInPicture,
  IconAlertCircle,
  IconX,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  createProduct,
  fetchProducts,
  fetchSuppliers,
  updateProduct,
} from '@/redux/slices/supplierSlice';
import { storage } from '@/configuration/firebase';

function AddEditProducts() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state: RootState) => state.suppliers.product);
  const suppliers = useSelector((state: RootState) => state.suppliers.suppliers);
  const navigate = useNavigate();

  // due to the permission handler is not works
  const permissionsString = localStorage.getItem('permissions');
  const permissions = permissionsString ? JSON.parse(permissionsString) : [];

  const hasPrivilege = (permission: string) => {
    try {
      return permissions.includes(permission);
    } catch (error) {
      console.error('Error checking privilege:', error);
      return false;
    }
  };

  const hasAnyPrivilege = (permissionArray: string[]) => {
    try {
      return permissionArray.some((permission) => permissions.includes(permission));
    } catch (error) {
      console.error('Error checking privileges:', error);
      return false;
    }
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct && selectedProduct.imageUrl) {
      setImageUrl(selectedProduct.imageUrl);
    }
  }, [selectedProduct]);

  const productAddEditForm = useForm({
    initialValues: {
      code: selectedProduct?.code || '',
      name: selectedProduct?.name || '',
      size: selectedProduct?.size || '',
      supplier: selectedProduct?.supplier?._id || '',
      buyingPrice: selectedProduct?.buyingPrice || '',
      sellingPrice: selectedProduct?.sellingPrice || '',
      imageUrl: selectedProduct?.imageUrl || '',
      notes: selectedProduct?.notes || '',
      status: selectedProduct?.status || 'ACTIVE',
    },

    validate: {
      code: isNotEmpty('Code is required'),
      name: isNotEmpty('Name is required'),
      size: isNotEmpty('Size is required'),
      supplier: isNotEmpty('Supplier is required'),
      buyingPrice: isNotEmpty('Buying price is required'),
      sellingPrice: isNotEmpty('Selling price is required'),
    },
  });

  const handleUpload = async (file: FileWithPath) => {
    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          Notifications.show({
            title: 'Error',
            message: 'Image upload failed. Please try again.',
            icon: <IconAlertCircle style={{ width: rem(18), height: rem(18) }} />,
            color: 'red',
          });
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('Download URL:', downloadURL); // Log the download URL
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
              reject(error);
            });
        }
      );
    });
  };

  const handleSave = async (values: any) => {
    try {
      let imageUrlToUse = imageUrl;
      if (files.length === 1) {
        imageUrlToUse = await handleUpload(files[0]);
        setImageUrl(imageUrlToUse); // Ensure state is updated
        productAddEditForm.setFieldValue('imageUrl', imageUrlToUse);
      }

      const payload = { ...values, imageUrl: imageUrlToUse };
      console.log(payload);

      await dispatch(createProduct(payload)).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Product Created Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      productAddEditForm.reset(); // Reset the form state
      dispatch(fetchProducts());
      navigate('/admin/suppliers/products');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error creating the product',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      let imageUrlToUse = imageUrl;
      if (files.length === 1) {
        imageUrlToUse = await handleUpload(files[0]);
        setImageUrl(imageUrlToUse); // Ensure state is updated
        productAddEditForm.setFieldValue('imageUrl', imageUrlToUse);
      }

      const payload = { ...values, imageUrl: imageUrlToUse };

      await dispatch(updateProduct({ id: selectedProduct?._id, data: payload })).unwrap();
      Notifications.show({
        title: 'Successful',
        message: 'Product Updated Successfully',
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
      });
      productAddEditForm.reset(); // Reset the form state
      dispatch(fetchProducts());
      navigate('/admin/suppliers/products');
    } catch (error) {
      Notifications.show({
        title: 'Error',
        message: 'There was an error updating the product',
        color: 'red',
        icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      productAddEditForm.setValues({
        code: selectedProduct.code,
        name: selectedProduct.name,
        size: selectedProduct.size,
        supplier: selectedProduct.supplier?._id,
        buyingPrice: selectedProduct.buyingPrice,
        sellingPrice: selectedProduct.sellingPrice,
        imageUrl: selectedProduct.imageUrl,
        notes: selectedProduct.notes,
        status: selectedProduct.status,
      });
    }
  }, [selectedProduct]);

  const previews = files.map((file, index) => {
    const previewUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={previewUrl}
        style={{ width: '200px', height: '200px' }} // Set your desired width and height
        onLoad={() => URL.revokeObjectURL(previewUrl)}
      />
    );
  });

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
                {selectedProduct ? 'Edit' : 'Add'} Product
              </Text>
            </div>
          </div>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form
          onSubmit={
            selectedProduct
              ? productAddEditForm.onSubmit(handleUpdate) // Use handleUpdate for editing
              : productAddEditForm.onSubmit(handleSave) // Use handleSave for creating
          }
        >
          <Table withRowBorders={false}>
            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Product Code"
                  withAsterisk
                  placeholder="Enter Product Code"
                  {...productAddEditForm.getInputProps('code')}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  label="Product Name"
                  withAsterisk
                  placeholder="Enter Product Name"
                  {...productAddEditForm.getInputProps('name')}
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Size"
                  withAsterisk
                  placeholder="Enter Size"
                  {...productAddEditForm.getInputProps('size')}
                />
              </Table.Td>
              <Table.Td>
                <Select
                  label="Supplier"
                  placeholder="Select Supplier"
                  data={suppliers.map((supplier: any) => ({
                    value: supplier?._id,
                    label: supplier.name,
                  }))}
                  withAsterisk
                  {...productAddEditForm.getInputProps('supplier')}
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <TextInput
                  label="Buying Price"
                  withAsterisk
                  placeholder="Enter Buying Price"
                  {...productAddEditForm.getInputProps('buyingPrice')}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  label="Selling Price"
                  withAsterisk
                  placeholder="Enter Selling Price"
                  {...productAddEditForm.getInputProps('sellingPrice')}
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <div>
                  <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} maxFiles={1}>
                    <div style={{ textAlign: 'center' }}>
                      <IconImageInPicture style={{ textAlign: 'center' }} />
                    </div>
                    <Text ta="center">Drop an image here</Text>
                  </Dropzone>

                  <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                    {previews}
                  </SimpleGrid>

                  {imageUrl && files.length === 0 && (
                    <SimpleGrid cols={1} mt="xl">
                      <Image
                        src={imageUrl}
                        alt="Product Image"
                        style={{ width: '200px', height: '200px' }} // Set your desired width and height
                      />
                    </SimpleGrid>
                  )}
                </div>
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td colSpan={2}>
                <Textarea
                  size="md"
                  label="Notes"
                  placeholder="Enter Notes"
                  {...productAddEditForm.getInputProps('notes')}
                />
              </Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                {selectedProduct && (
                  <Select
                    color="violet"
                    size="xs"
                    radius="sm"
                    data={['ACTIVE', 'DEACTIVE']}
                    {...productAddEditForm.getInputProps('status')}
                  />
                )}
              </Table.Td>
              <Table.Td style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  style={{ width: 100 }}
                  variant="filled"
                  color="violet"
                  size="sm"
                  type="submit"
                >
                  Save
                </Button>
              </Table.Td>
            </Table.Tr>
          </Table>
        </form>
      </Card>
    </>
  );
}

export default AddEditProducts;
