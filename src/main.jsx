import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// pages
import UserPage from './pages/UserPage';
import PostsPages from './pages/PostsPages';

/** rutas */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PostsPages />}></Route>
      <Route path="user/:id" element={<UserPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
