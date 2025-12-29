import './index.css';
import NewApp from './NewApp';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import DaisyProvider from './context/DaisyProvider';
import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

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
    <ErrorBoundary FallbackComponent={({ error }) => <div>Something went wrong. {(error as Error).message}</div>}>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        {/* <DataStoreProvider> */}
        {/* </DataStoreProvider> */}
        <DaisyProvider>
          <NewApp />
        </DaisyProvider>
      </PersistQueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)