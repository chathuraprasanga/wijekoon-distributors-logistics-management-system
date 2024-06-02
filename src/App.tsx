// core styles are required for all packages
import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, MantineProvider, Overlay, Skeleton } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import { theme } from './theme';
// eslint-disable-next-line import/no-cycle
import { Router } from './Router';

// other css files are required only if
// you are using components from the corresponding package
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

import { RootState } from './redux/store';
// ...

const selectIsLoading = (state: RootState) =>
  Object.values(state).some((slice: any) => slice.status === 'loading');

function App() {
  const isLoading = useSelector(selectIsLoading);

  const Loading = () => (
    <Overlay
      color="black"
      opacity={0.6}
      zIndex={9999}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Loader color="grape" size="md" type="bars" />
    </Overlay>
  );

  return (
    <MantineProvider theme={theme}>
      {isLoading && <Loading />}
      <React.Suspense fallback={<Loading />}>
        <Notifications position="top-right" zIndex={1000} limit={2} />
        <Router />
      </React.Suspense>
    </MantineProvider>
  );
}

export default App;
