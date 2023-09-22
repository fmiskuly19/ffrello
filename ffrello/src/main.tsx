import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';

import store from './redux/store.tsx'
import theme from './themes/theme.tsx'

import HighlightsPage from './routes/homeView/highlightsPage.tsx'
import WorkspaceMembersPage from './routes/workspaceView/workspaceMembersPage.tsx';
import BoardPage from './routes/boardView/board.tsx';
import WorkspaceTablePage from './routes/workspaceView/workspaceTablePage.tsx';
import WorkspaceCalendarPage from './routes/workspaceView/workspaceCalendarPage.tsx';
import WorkspaceSettingsPage from './routes/workspaceView/workspaceSettingsPage.tsx';
import MainPage from './routes/mainPage.tsx';
import HomePages from './routes/homeView/homePages.tsx';
import TemplatesPage from './routes/homeView/templatesPage.tsx';
import BoardsPage from './routes/homeView/boardsPage.tsx';
import WorkspaceView from './routes/workspaceView/workspacePage.tsx';
import WorkspaceBoardsPage from './routes/workspaceView/workspaceBoardsPage.tsx';
import WorkspaceHighlightsPage from './routes/homeView/workspaceHighlightsPage.tsx';
import WorkspaceHomePage from './routes/homeView/workspaceBoardsPage.tsx';


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
            element: <HighlightsPage />
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
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </>,
)
