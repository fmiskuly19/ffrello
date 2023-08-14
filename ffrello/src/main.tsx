import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import store from './ducks/store'
import theme from './themes/theme.tsx'
import './index.css'

import BoardsPage from './routes/boards'
import HomePage from './routes/home.tsx'
import TemplatesPage from './routes/templates.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/templates",
    element: <TemplatesPage />
  },
  {
    path: "/boards",
    element: <BoardsPage />
  }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
