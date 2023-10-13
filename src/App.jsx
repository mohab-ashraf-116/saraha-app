
import logo from './logo.svg';
import './App.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import SendMessage from './components/SendMessage/SendMessage';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';



const routes = createBrowserRouter([{
  path: "", element: <Layout />, children: [
   
    { path: "register", element: <Register /> },
    { path: "login", element: <Login /> },
    { path: "profile", element: <ProtectedRoutes> <Profile /> </ProtectedRoutes> },
    { path: "message/:userId", element:  <SendMessage />  },

    { path: "*", element: <NotFound /> }
  ]
}])

function App() {

  let {setToken}= useContext(tokenContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"));
    }
  },[])
  return (
 

    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes}></RouterProvider>
    
    </QueryClientProvider>
    
  );
}

export default App;
