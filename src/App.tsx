// core styles are required for all packages
import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import { theme } from './theme';
import { Router } from './Router';
import { Loading } from './hoc/Loader';

// other css files are required only if
// you are using components from the corresponding package
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
// ...

function App() {
  return (
    <MantineProvider theme={theme}>
      <React.Suspense fallback={<Loading />}>
        <Notifications position="top-right" zIndex={1000} limit={2} />
        <Router />
      </React.Suspense>
    </MantineProvider>
  );
}

export default App;
