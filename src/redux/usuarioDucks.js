import { auth, firebase } from "./../firebase";

//estado inicial
const dataInicial = {
  loading: false,
  activo: false,
};

//types
const LOADING = "LOADING";
const USUARIO_ERROR = "USUARIO_ERROR";
const USUARIO_EXITO = "USUARIO_EXITO";
const CERRAR_SESION = "CERRAR_SESION";

//reducer
export default function usuarioReducer(state = dataInicial, action) {
  switch (action.type) {

    case LOADING:
      return { ...state, loading: true };

    case USUARIO_ERROR:
      return { ...dataInicial };

    case USUARIO_EXITO:
      return { ...state, loading: false, user: action.payload, activo: true };

    case CERRAR_SESION:
        return { ...dataInicial };

    default:
      return { ...state };
  }
}

//actions
export const ingresoUsuarioAccion = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });

  try {
    const provider = new firebase.auth.GoogleAuthProvider(); //para poder acceder con google
    const res = await auth.signInWithPopup(provider); //mostrara un pop up con las posibles cuentas para hacer log in
    console.log(res);
    dispatch({
      type: USUARIO_EXITO,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
      },
    });
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: USUARIO_ERROR,
    });
  }
};

//funcion para leer el usuario de localStorage
export const leerUsuarioActivoAccion = () => (dispatch) => {
  if (localStorage.getItem("usuario")) {
    dispatch({
      type: USUARIO_EXITO,
      payload: JSON.parse(localStorage.getItem("usuario")),
    });
  }
};

//funcion para cerrar sesion
export const cerrarSesionAccion = () => (dispatch) => {
  auth.signOut(); //auth es la utenticacion de firebase la cual deja entrar a los usuarios con sus emails
  localStorage.removeItem("usuario");
  dispatch({
    type: CERRAR_SESION
  });
};
