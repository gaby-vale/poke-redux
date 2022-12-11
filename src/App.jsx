import Pokemones from "./components/Pokemones";
import { BrowserRouter as Router,Route ,Routes, Navigate } from "react-router-dom";
import {Login} from "./components/Login";
import Navbar from "./components/Navbar";
import React from "react";
import { auth } from "./firebase";

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => { //onAuthStateChanged lee la informacion del usuario
        console.log(user);
        if(user){
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  },[])

  const RutaPrivada = ({element, path, ...resto}) => {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route element={element} path={path} {...resto}/>
      }else {
        return <Navigate to="/login" {...resto} />
        }
    }else{
      return <Navigate to="/login" {...resto} />
    }
  }

  return (
    <Router>
      <div className="container mt-3">

      <Navbar />

        <Routes>
          <RutaPrivada element={<Pokemones />} path="/" exact/>
          <Route element={<Login />} path="/login"/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
