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


import HomePage from './routes/homeView/home.tsx'
import WorkspaceMembersPage from './routes/workspaceView/workspaceMembersPage.tsx';
import BoardPage from './routes/boardView/board.tsx';
import WorkspaceTablePage from './routes/workspaceView/workspaceTablePage.tsx';
import WorkspaceCalendarPage from './routes/workspaceView/workspaceCalendarPage.tsx';
import WorkspaceSettingsPage from './routes/workspaceView/workspaceSettingsPage.tsx';
import MainPage from './routes/mainPage.tsx';
import HomePages from './routes/homeView/homePages.tsx';
import TemplatesPage from './routes/homeView/templates.tsx';
import BoardsPage from './routes/homeView/boards.tsx';
import WorkspaceView from './routes/workspaceView/workspacePage.tsx';
import WorkspaceBoardsPage from './routes/workspaceView/workspaceBoardsPage.tsx';
import WorkspaceHighlightsPage from './routes/homeView/workspaceHighlights.tsx';
import WorkspaceHomePage from './routes/homeView/workspaceHome.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        element: <HomePages />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          {
            path: "/templates",
            element: <TemplatesPage />
          },
          {
            path: "/boards",
            element: <BoardsPage />
          },
          {
            path: "/w/:workspaceid/highlights",
            element: <WorkspaceHighlightsPage />
          },
          {
            path: "/w/:workspaceid/home",
            element: <WorkspaceHomePage />
          }
        ]
      },
      {
        path: "/w/:workspaceid",
        element: <WorkspaceView />,
        loader: async ({ params }) => {
          return await fetch(`/api/workspace/${params.workspaceid}`).then((res) => res.json());
        },
        children: [
          {
            path: "",
            element: <WorkspaceBoardsPage />,
          },
          {
            path: "members",
            element: <WorkspaceMembersPage />,
          },
          {
            path: "views/table",
            element: <WorkspaceTablePage />
          },
          {
            path: "views/calendar",
            element: <WorkspaceCalendarPage />
          },
          {
            path: "account",
            element: <WorkspaceSettingsPage />
          }
        ],
      },
      {
        path: "/b/:boardid/:boardname",
        element: <BoardPage />,
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
