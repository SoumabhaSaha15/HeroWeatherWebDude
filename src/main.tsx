import './index.css';
import App from './App';
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import DataStoreProvider from './context/DataStoreProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HeroUIProvider>
    <ToastProvider />
    <DataStoreProvider>
      <App />
    </DataStoreProvider>
  </HeroUIProvider>,
)