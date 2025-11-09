import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import UADLayout from './pages/UAD.jsx'
import Students from './pages/Students.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdvisorySessions from './pages/AdvisorySessions.jsx'
import Login from './pages/Login.jsx'
import LandingPage from './pages/LandingPage.jsx'

import { AuthProvider } from './AuthContext.jsx'
import PrivateRoute from './PrivateRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/tickets',
    element: (
    <PrivateRoute>
      <UADLayout/>
    </PrivateRoute>
    ),
  },
  {
    path: '/students',
    element: (
      <PrivateRoute>
      <div className="h-screen flex flex-col">
        <div className='sticky top-0 z-30'>
          <Navbar/>
        </div>
          <Students/>
      </div>
      </PrivateRoute>
    )
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <div className="h-screen flex flex-col">
          <div className='sticky top-0 z-30'>
            <Navbar/>
          </div>
            <Dashboard/>
        </div>
      </PrivateRoute>
    )
  },
  {
    path: '/sessions',
    element: (
      <PrivateRoute>
        <div className="h-screen flex flex-col">
          <div className='sticky top-0 z-30'>
            <Navbar/>
          </div>
            <AdvisorySessions/>
        </div>
      </PrivateRoute>
    )
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/',
    element: <LandingPage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
);
