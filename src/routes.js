import { Navigate,BrowserRouter, Route,Switch, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ClincForm from './pages/ClincForm';
import ClincDetails from './pages/ClincDetails';
import Patient from './pages/Patient';
import Nurse from'./pages/Nurse';
import Pharmacist from './pages/Pharmacist';
import AA from './pages/maisonsPage';
import DCLS from './pages/DCLS';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'Clincform', element:<ClincForm/> },
        { path: 'ClincDetails', element:<ClincDetails/> },
        { path: '/dashboard/Patient', element:<Patient/> },
        { path: '/dashboard/Nurse', element:<Nurse/> },
        { path: '/dashboard/Pharmacist', element:<Pharmacist/> },
        { path: 'maisonList', element: <AA /> },
        { path: '/dashboard/DCLS', element:<DCLS/> },







      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        
      ],
    },
    {
      path: 'blog',
      element: <Navigate to="LoginPage"/>,
    },
    {
      path: 'ClincDetails',
      element: <ClincDetails/>,
    },
    {
      path: 'Clincform',
      element: <ClincForm/>,
    },
    {
      path: 'maisonList',
      element: <AA/>,
    },
    
   
    
    
 
  ]);

  return routes;
}
