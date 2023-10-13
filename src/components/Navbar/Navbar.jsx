import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext';
export default function Navbar() {
  let navigate = useNavigate()
  let{token,setToken} = useContext(tokenContext);
  function logOut(){
    localStorage.removeItem("userToken");
    setToken(null)
   navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             

              { token ? <>
               
               <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/profile'}>Profile</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={logOut}>Logout</button>
              </li>
               </> :
               <> 
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/register'}>Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={'/login'}>Login</Link>
              </li
              ></>}
            
           
            </ul>        
          </div>
        </div>
      </nav>

    </>
  )
}
