import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Analytics from './pages/analytics';
import Store from './pages/store';
import StanceDetail from './pages/stancedetail';
import { createBrowserRouter, RouterProvider,Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/store',
    element: <Store />,
  
  },
  {
    path: '/analytics/:filename',
    element: <Analytics />,
  },
  {
    path: '/analytics/:filename/:time/:user',
    element: <StanceDetail />,
  }
])

root.render(
  <RouterProvider router={router} />
);

