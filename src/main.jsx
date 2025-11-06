import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UADLayout from './pages/UAD.jsx'
import Students from './pages/Students.jsx'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/tickets',
    element: <UADLayout/>,
  },
  {
    path: '/students',
    element: (
      <div className="h-screen flex flex-col">
        <div className='sticky top-0 z-30'>
          <Navbar/>
        </div>
          <Students/>
      </div>
    )
  },
  {
    path: '/',
    element: (
    <div className="h-screen flex flex-col">
        <div className='sticky top-0 z-30'>
          <Navbar/>
        </div>
          <Dashboard/>
      </div>
    )
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
