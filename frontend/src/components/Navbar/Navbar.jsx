import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) =>{
    e.preventDefault();
    dispatch({type: 'LOGOUT'});
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>Inicio</Link>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to={'/lista'}>Lista</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/agregar'}>Agregar</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/register'}>Registrarse</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={'/login'}>Login</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link"  onClick={handleClick} to={'/'}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
