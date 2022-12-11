import React from 'react'
//hooks
//useDispatch = sirve para consumir las acciones del duck
//useSelector = sirve para extraer los datos del store
import { useSelector, useDispatch } from 'react-redux'
import {obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, unPokeDetalleAccion} from '../redux/pokeDucks'; //importamos las acciones
import Detalle from './Detalle';
import GameControl from './Icons/controlGameIcon.js'
import ArrowRight from './Icons/arrowRightIcon.js'
import ArrowLeft from './Icons/arrowLeftIcon';
import './list-pokemons.css'

const Pokemones = () => {

  const dispatch = useDispatch(); //llamamos a las acciones del duck
  const pokemones = useSelector( store => store.pokemones.results); //llamamos al array de pokemones son 20, useSelector() nos sirve para leer lo que tenemos en el state del store
  const next = useSelector(store => store.pokemones.next);
  const previous = useSelector(store => store.pokemones.previous);

  return (
    <div className='row'>
      <div className='col-md-6'>
        <h3>Lista de pokemones</h3>
        <br />
        <div className='d-flex justify-content-between'>
          {
            pokemones.length === 0 && 
            <button className='btn btn-outline-danger' onClick={() => { dispatch( obtenerPokemonesAccion() ) }}>
              <GameControl />
              <br />
              Get Pokemones
            </button>
          }
          {
            next && 
            <button className='btn btn-dark' onClick={() => {dispatch( siguientePokemonAccion() ) }}>
              Siguiente&nbsp;
              <ArrowRight />
            </button>
          }
          {
            previous &&
            <button className='btn btn-dark' onClick={() => {dispatch( anteriorPokemonAccion() ) }}>
              <ArrowLeft />&nbsp;
              Anterior
            </button>
          }
        </div>
        <ul className='list-group mt-3'>
          {
            pokemones.map(item => ( 
              <li key={item.name} className="list-group-item list-group-item-action text-uppercase">
                {item.name}
                <button 
                  onClick={() => {dispatch(unPokeDetalleAccion(item.url) ) }} 
                  className='btn btn btn-outline-primary btn-sm float-end'
                >
                  Info
                </button>
              </li>
            ))
          }
        </ul>

      </div>
      <div className='col-md-6'>
          <h3>Detalle del pokemon</h3>
          <Detalle />
      </div>
    </div>
  )
}

export default Pokemones