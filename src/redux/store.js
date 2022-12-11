// aqui tendremos todos los estados disonibles para nuestra applicacion
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
 
//en el store siempre importamos el reducer
import pokesReducer from './pokeDucks'
import usuarioReducer, {leerUsuarioActivoAccion} from './usuarioDucks'

 
//si tenemos mas ducks o reducers lo pondremos aqui
const rootReducer = combineReducers({
    //alias: original
    pokemones: pokesReducer,
    usuario: usuarioReducer
})
 
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( 
        applyMiddleware(thunk) ) )
    leerUsuarioActivoAccion()(store.dispatch); //como la funcion tiene doble arrow funtion ponemos doble ()
    return store
}