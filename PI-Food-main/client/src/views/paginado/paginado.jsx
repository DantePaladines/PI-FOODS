import React from "react";
import "./paginado.css";

export default function Paginado ({recipesPerPage, totalPost, setCurrentPage, currentPage}) {

    const pages = [];// creo una matriz vacia queremos llenar esa matriz con numeros de la pagina

    for(let i = 1; i <= Math.ceil(totalPost/recipesPerPage) ; i++){// divido el totas de datos en la api entre numero de datos mostrados en la pantalla
        pages.push(i)// guardo el numero de recorrido a mi array
    }

    return(
        <div className="paginado">
            {
                pages.map((pages, index) => {
                    return <button key={index} onClick={() => setCurrentPage(pages)}
                    className={pages === currentPage ? 'active' : ''}// colorea el boton que esta en seleccion
                    >{pages}</button>// muestro todos los numeros de la matriz
                })
            }
        </div>
    )
}