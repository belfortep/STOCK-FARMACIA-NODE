import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => {
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
          </ul>
        </div>
      </div>
    </nav>
  )
}
