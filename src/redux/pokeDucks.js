import axios from 'axios';

// constantes / state / initial state / estado inicial
const dataInicial = { //todos los parametros de initial state los tomamos de lo que responde la api
    count: 0,
    next: null,
    previous: null,
    results: []
}

//types
const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO';
const POKE_INFO_EXITO = 'POKE_INFO_EXITO';

//reducer    (hacemos manejo de lo que regresa la api) aqui tenemos el valor actual del state y devolveremos un nuevo valor
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload} //action.payload estara dentro de un objeto llamado unPokemon
        default:
            return state
    }
}

//ACCIONES (aqui consumimos la api)
export const unPokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {

    /*if(url === undefined){
        url = 'https://pokeapi.co/api/v2/pokemon/1/';
    }*/

    try {
        const res = await axios.get(url)
        dispatch({
            type: POKE_INFO_EXITO,
            payload: {
                nombre: res.data.name,
                ancho: res.data.weight,
                largo: res.data.height,
                foto: res.data.sprites.front_default
            }
        })
    } catch (error) {
        console.log(error)
    }
}


//accion
export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data //aqui es donde esta la info que necesito de la api
        })
    } catch (error) {
        console.log(error)
    }
}
//accion
export const siguientePokemonAccion = () => async (dispatch, getState) => {

    const {next} = getState().pokemones;

    try {
        const res = await axios.get(next);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data //enviamos toda la data
        })
    } catch (error) {
        console.log(error)
    }
}
//accion
export const anteriorPokemonAccion = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones;

    try {
        const res = await axios.get(previous);
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: res.data //enviamos toda la data que envia la api
        })
    } catch (error) {
        console.log(error)
    }

}