
import Button from '@mui/material/Button';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import Login from './pages/auth/Login';
import Error from './pages/error/Error';
import RootLayouts from './components/layouts/RootLayouts';
import Home from './pages/home/Home';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RootLayouts/>}>
          <Route path='/home' element={<Home/>} />
        </Route>
        <Route path='*' element={<Error/>} />
        <Route path='/' element={<Login/>} />
      </Route>
    )
  );
  

  return (
    <RouterProvider
    router={router}
  />
  )
}

export default App
