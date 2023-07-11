import React from "react";
import { useHistory } from "react-router-dom";
import  "./landing.css";


export default function Landing () {

    const history = useHistory()

    function botonHome(e) {
        e.preventDefault()// la pagina evita recargarse
        console.log('Hola mundo')

        history.push('/Home')//
    }

    return (
        <div className='landing_div' >
            <h3 className='h3_child'>Landing Page de Foods</h3>
            <p className='p_child'>Imagen de fondo</p>
            <p className='p_child_two'>Boton que redirige al home de la aplicacion</p>
            <button className='btn_child' onClick={(e) => botonHome(e)}>
                Iniciar
            </button>
        </div>
    )
}