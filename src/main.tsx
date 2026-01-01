import './index.css';
import App from './App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import DaisyProvider from './context/DaisyProvider';
import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GeolocationProvider from './context/geolocation/GeolocationProvider';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import ErrorComponent from './ErrorComponent';

const persister = createAsyncStoragePersister({ storage: window.localStorage });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      <ErrorBoundary FallbackComponent={({ error }) => (<ErrorComponent error={error} />)}>
        {/* <DataStoreProvider> */}
        {/* </DataStoreProvider> */}
        <DaisyProvider>
          <GeolocationProvider>
            <App />
          </GeolocationProvider>
        </DaisyProvider>
      </ErrorBoundary>
    </PersistQueryClientProvider>
  </StrictMode>,
)