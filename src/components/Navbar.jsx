import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {cerrarSesionAccion} from '../redux/usuarioDucks.js'

const Navbar = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    dispatch(cerrarSesionAccion())
    navigate('/login')
  }

  return(
  <div className="navbar navbar-dark bg-primary">
    <Link className="navbar-brand" to="/">APP POKE</Link> {/** El nombre de la pag */}
    <div className="d-flex">
      <NavLink className="btn btn-primary mr-2" to="/" exact="true">Inicio</NavLink>
      <NavLink className="btn btn-primary mr-2" to="/login" exact="true">Login</NavLink>
      <button className="btn btn-primary mr2" onClick={() => cerrarSesion()}
        >Cerrar Sesión</button>

    </div>
  </div>
  )
}

export default Navbar;
