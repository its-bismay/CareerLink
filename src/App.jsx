import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import Job from './pages/Job';
import PostJobs from './pages/PostJobs';
import SavedJobs from './pages/SavedJobs';
import MyJobs from './pages/MyJobs';
import { ThemeProvider } from './components/ThemeProvider';
import './App.css'

const router = createBrowserRouter([
  {
    element:<AppLayout></AppLayout>,
    children:[
      {
        path:'/',
        element:<LandingPage></LandingPage>
      },
      {
        path:'/onboarding',
        element:<Onboarding />
      },
      {
        path:'/joblisting',
        element:<JobListing />
      },
      {
        path:'/jobs',
        element:<JobListing />
      },
      {
        path:'/job/:id',
        element:<Job />
      },
      {
        path:'/post-job',
        element:<PostJobs />
      },
      {
        path:'/saved-jobs',
        element:<SavedJobs />
      },
      {
        path:'/my-jobs',
        element:<MyJobs />
      }
    ]
  }
])

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {<RouterProvider router={router}></RouterProvider>}
  </ThemeProvider>);
}

export default App
