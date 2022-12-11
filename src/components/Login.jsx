import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { ingresoUsuarioAccion } from "../redux/usuarioDucks";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(store => store.usuario.loading);
  const activo = useSelector(store => store.usuario.activo);

  //useEffect nos ayuda a hacer el seguimiento de algun dato
  React.useEffect(()=> {
    console.log("activo: ",activo);
    if(activo){
      navigate('/'); //en lugar de withRoute
    }
  },[activo]) 


  return <div className="mt-5 text-center">
    <h3>Ingreso con Google</h3>
    <hr/>
    <button 
      className="btn btn-dark"
      onClick={() => dispatch(ingresoUsuarioAccion())}
      disabled = {loading}
      >Acceder</button>
  </div>;
};
