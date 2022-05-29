import React, { useContext, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
export const Login = () => {

  const [credentials, setCredentials] = useState({
    username:undefined,
    password:undefined
  })

  const {user, loading,error, dispatch} = useContext(AuthContext);

  const handleChange = (e) =>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  }

  const handleClick = async (e) =>{
    e.preventDefault()

    dispatch({type:'LOGIN_START'})

    try{

      const res = await axios.post('http://localhost:4000/auth/login', credentials);
      dispatch({type:'LOGIN_SUCCESS', payload: res.data});


    }catch(err){
      dispatch({type: 'LOGIN_FAILURE', payload:err.response.data})
    }
  }
  console.log(user);

  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Stock Farmacia</h3>
            <span className="loginDesc">
              Sistema de manejo de Stock de medicamentos
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox">
              <input id='username' placeholder="Username" type="text" required className="loginInput" onChange={handleChange} />
              <input id='password' placeholder="Password" type="password" minLength="6" required className="loginInput" onChange={handleChange} />
              <button className="loginButton" onClick={handleClick}>Login</button>
              {error && <span>{error.message}</span>}
              <Link to={'/register/'} className="loginRegisterButton">Sin cuenta? registrate!</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
