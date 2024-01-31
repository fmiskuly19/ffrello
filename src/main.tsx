import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';

import { GoogleOAuthProvider } from '@react-oauth/google';

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
import DefaultTheme from './themes/defaultTheme.tsx'

import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        element: <HomePages />,

        children: [
          {
            // the highlights page's path is set to '/' which looks odd with this pattern of routes given that its 2 children deep.
            // <MainPage/> is the Navbar with an <Outlet/> below for routed components
            // <HomePages/> contains the leftSidebar, and an <Outlet/> component for the routed content.

            /* so when navigating to '/' it is rending the MainPages Outlet,
              which goes to the HomePages compoent of Sidebar content and Outlet, 
              which goes to the next element with the path '/', 
              rendering the default path as the navbar, with homepage left side bar content, and the highlights page shown  by default. */

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

  const currentThemeName = useAppSelector((state) => state.themeSlice.currentThemeName);
  const themes = useAppSelector((state) => state.themeSlice.themes);

  const [theme, setTheme] = useState(DefaultTheme.theme);

  useEffect(() => {
    let theme = themes.find(x => x.name == currentThemeName).theme;
    setTheme(theme);
  }, [currentThemeName])

  console.log(`app mode: ${import.meta.env.MODE}`)
  console.log(`ffrello api endpoint: ${import.meta.env.VITE_FFRELLO_API_ENDPOINT}`)


  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID as string}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <SnackbarProvider maxSnack={4}>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </DndProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default Main;