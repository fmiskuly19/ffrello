import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';

import HighlightsPage from './routes/homeView/homeHighlightsPage.tsx'
import WorkspaceMembersPage from './routes/workspaceView/workspaceMembersPage.tsx';
import BoardPage from './routes/boardView/boardPage.tsx';
import WorkspaceTablePage from './routes/workspaceView/workspaceTablePage.tsx';
import WorkspaceCalendarPage from './routes/workspaceView/workspaceCalendarPage.tsx';
import WorkspaceSettingsPage from './routes/workspaceView/workspaceSettingsPage.tsx';
import MainPage from './routes/mainPage.tsx';
import HomePages from './routes/homeView/homePages.tsx';
import TemplatesPage from './routes/homeView/homeTemplatesPage.tsx';
import HomeBoardsPage from './routes/homeView/homeBoardsPage.tsx';
import WorkspaceView from './routes/workspaceView/workspacePage.tsx';
import WorkspaceBoardsPage from './routes/workspaceView/workspaceBoardsPage.tsx';
import WorkspaceHighlightsPage from './routes/homeView/workspaceHighlightsPage.tsx';
import WorkspaceHomePage from './routes/homeView/workspaceBoardsPage.tsx';
import { SnackbarProvider } from 'notistack';
import { useAppSelector } from './hooks.tsx';

import * as Themes from './themes/themeIndex.tsx'

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
            path: "/u/:userid/boards",
            element: <HomeBoardsPage />
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

const Main = () => {

  const theme = useAppSelector((state) => state.themeSlice.theme);

  const getTheme = () => {
    switch (theme) {
      case 'Frutiger Aero':
        return Themes.FrutigerAero.theme;
      case 'Default':
        return Themes.Default.theme;
      default:
        return Themes.Default.theme;
    }
  }

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <SnackbarProvider maxSnack={4}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Main;