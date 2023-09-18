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
import WorkspacePage from './routes/workspace/workspacePage.tsx';
import WorkspaceMembersPage from './routes/workspace/workspaceMembersPage.tsx';
import BoardPage from './routes/board.tsx';
import WorkspaceTableViewPage from './routes/workspace/workspaceTableViewPage.tsx';
import WorkspaceCalendarViewPage from './routes/workspace/workspaceCalendarViewPage.tsx';
import WorkspaceSettingsPage from './routes/workspace/workspaceSettingsPage.tsx';
import MainPage from './routes/mainPage.tsx';
import HomePages from './routes/homePages.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        element: <HomePages />,
        children: [
          {
            path: "/templates",
            element: <TemplatesPage />
          },
          {
            path: "/boards",
            element: <BoardsPage />
          },
          {
            path: "/",
            element: <HomePage />
          },
        ]
      },
      {
        path: "/w/:workspaceid",
        element: <WorkspacePage />,
        loader: ((params) => {
          return ("")
        }),
        children: [
          {
            path: "members",
            element: <WorkspaceMembersPage />,
          },
          {
            path: "views/table",
            element: <WorkspaceTableViewPage />
          },
          {
            path: "views/calendar",
            element: <WorkspaceCalendarViewPage />
          },
          {
            path: "settings",
            element: <WorkspaceSettingsPage />
          }
        ],
      },
      {
        path: "/b/:boardid/:name",
        element: <BoardPage />,
        loader: ((params) => {
          return ("")
        }),
      }
    ]
  },

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
