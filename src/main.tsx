import './index.css';
import NewApp from './NewApp';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary';
import ThemeProvider from './context/theme/ThemeProvider';
import ToastProvider from './context/toast/ToastProvider';
import ModalProvider from './context/Modal/ModalProvider';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
// import DataStoreProvider from './context/data/DataStoreProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'

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
        <ToastProvider>
          <ThemeProvider>
            <ModalProvider>
              <NewApp />
            </ModalProvider>
          </ThemeProvider>
        </ToastProvider>
        {/* </DataStoreProvider> */}
      </PersistQueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)