import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../../redux/actions";
import  { Link } from "react-router-dom"

export default function Search() {

    const [titulo, setTitulo] = useState(" ")
    const busqueda = useSelector((state) => state.search)
    console.log(busqueda, 'este es de busqueda')

    console.log(titulo)

    const dispatch = useDispatch()

    function handleSearch(e) {
        e.preventDefault()

        setTitulo(e.target.value)
       // se ejecuta al momento de escribir en el input
        
    }

    function handleSubmit(event) {

        event.preventDefault()
        dispatch(searchByName(titulo))
    }

    //useEffect(() => {
    //    
    //    console.log('se ejecuto la busqueda')
    //    
    //}, [search])// se ejecuta cada vez que se actualiza el estado

    return(
        <form onSubmit={(event) => handleSubmit(event)}>

            <input type="text" placeholder="Search..." name="titulo" value={titulo} autoComplete="off" onChange={(e)=> handleSearch(e) }/>

            <button>
                buscar
            </button>

            <ul>
                {
                    !busqueda.length == 0 ? busqueda.map((z) => {// falta controlar este bug
                        return (
                            <li key={z.id}>
                                <Link to={'/details'}>{z.titulo}</Link>{/*se le envia por props*/}
                            </li>
                        )
                    }) : 
                    <div>
                        <p>No hay resultados de receta</p>
                    </div>
                }
            </ul>

        </form>

    )
}