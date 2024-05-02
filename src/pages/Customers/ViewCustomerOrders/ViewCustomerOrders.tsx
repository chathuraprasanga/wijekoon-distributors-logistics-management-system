import { Grid, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ViewCustomerOrders() {
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
                View Customer Order
              </Text>
            </div>
            <div></div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default ViewCustomerOrders;
