import './index.css';
import App from './App';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary';
import ThemeProvider from './context/theme/ThemeProvider';
import ToastProvider from './context/toast/ToastProvider';
import DataStoreProvider from './context/data/DataStoreProvider';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={({ error }) => <div>Something went wrong. {(error as Error).message}</div>}>
      <DataStoreProvider>
        <ToastProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ToastProvider>
      </DataStoreProvider>
    </ErrorBoundary>
  </StrictMode>,
)