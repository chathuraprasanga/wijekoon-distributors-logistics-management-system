import { Loader } from '@mantine/core';

export function Loading() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      <Loader color="violet" size="lg" type="bars" />;
    </div>
  );
}
