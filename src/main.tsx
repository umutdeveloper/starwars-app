import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@store/index';
import ErrorBoundary from 'hocs/ErrorBoundary';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const BASE_URL = import.meta.env.VITE_BASE_HREF;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <CssBaseline />
        <BrowserRouter basename={BASE_URL}>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
