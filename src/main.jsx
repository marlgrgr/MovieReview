import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesComponent from './routes';
import './index.css';
import { ModalProvider } from './context/ModalContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <RoutesComponent />
    </ModalProvider>
  </React.StrictMode>
);
