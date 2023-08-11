// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Appbar from './components/appbar'
import { Container } from '@mui/material'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './routes/home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

function App() {

  return (
    <>
      <Container maxWidth={false} sx={{ p: '0px !important' }}>
        <Appbar />
        <RouterProvider router={router} />
      </Container>
    </>
  )
}

export default App
