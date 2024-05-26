
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
import Registration from './pages/auth/Registration';
import Message from './pages/message/Message';
import Notification from './pages/notification/Notification';
import Settings from './pages/settings/Settings';
import IsLogedinUser from './privateRoutes/IsLogedinUser';
import Profile from './pages/profile/Profile';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<IsLogedinUser/>}>
          <Route element={<RootLayouts/>}>
            <Route path='/home' element={<Home/>} />
            <Route path='/message' element={<Message/>} />
            <Route path='/notification' element={<Notification/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/profile/:id' element={<Profile/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Error/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
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
