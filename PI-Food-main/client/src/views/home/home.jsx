import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoods, getDiets, filterDiets, ordenByPunctuation, ordenAlfabetico, mayorSetenta } from "../../redux/actions.js";
import Cards from "../../components/cards/cards.jsx";
import Paginado from "../paginado/paginado.jsx";
import Search from "../../components/search/search.jsx";
import { useState, useEffect } from "react";
import "./home.css";

/*al momento de entrar al home */
export default function Home () {

    const foodFull = useSelector((state) => state.recipes)// es lo mismo que hacer mapStateToProps
    const opctionDiets = useSelector((state) => state.dieta)// es lo mismo que hacer mapStateToProps
    //const foodFilter = useSelector((state) => state.typeDiets)

    //console.log(foodFilter, 'home')
    const dispatch = useDispatch()

    
    console.log(opctionDiets)
    console.log(foodFull)

    const [orden, setOrden] = useState('')// para el ordenamiento de mayor a menor
    console.log(orden, 'orden de home')
    const [order, serOrder] = useState('')

    const [ currentPage, setCurrentPage ] = useState(1)//pagina actual se inicializa desde 1
    const [ recipesPerPage, setRecipesPerPage] = useState(9)// cuantos productos se require por pagina

    //const maximo = foodFull.length / recipesPerPage // dividido a la cantidad de food por pagina

    //console.log(maximo)

    const indexLastRecipes = currentPage * recipesPerPage// multiplicamos 1 * 9 = 9
    const indexFirstRecipes = indexLastRecipes - recipesPerPage// 9 - 9 = 0
    const currentRecipes = foodFull.slice(indexFirstRecipes, indexLastRecipes)// obtiene el indice 0 del array y el indice 9 del array == 10 datos pero omite el decimo

    console.log(currentRecipes.length)

    useEffect(() => { // se ejecuata la funcion de useEffect
        dispatch(getFoods())// dispatch ejecutaria la funcion getfoods
        dispatch(getDiets())

    }, [dispatch])// en el array he colocado la constante "dispatch" para hacerle un seguimiento

    function filterPorDieta(e) {
        console.log("filtrado por todos")

        dispatch(filterDiets(e.target.value))
    }
    // de ordenamiento por puntuacion
    function mayorAMenor(e) {
        console.log('datos ordenados')
        dispatch(ordenByPunctuation(e.target.value))
        setOrden(e.target.value)
    }

    function refresh() {
        dispatch(getFoods())
        console.log("datos receteados")
    }

    function orderAlfabetico(e) {
        console.log('letras ordenadas')
        dispatch(ordenAlfabetico(e.target.value))
        serOrder(e.target.value)
    }

    function mayorsetenta(){
        dispatch(mayorSetenta(70))
        console.log("datos mayores a setenta")
    }

    return (
        <div className="Home">
            {/*input de tipos de dietas*/}

            <div className="gruop_Father">

                <div className="group_Filter">

                    <div className="filter">

                        <select className="select_Filter" onChange={(e) => filterPorDieta(e)} >
                            <option value={"Todas las Recetas"}>Todas las Recetas</option>
                            {
                                opctionDiets.map((b) => {
                                    return <option value={b.name} key={b.id}>{b.name}</option>
                                })
                            }
                        </select>
                        
                    </div>
                        
                    <div>
                        <select onChange={(e) => mayorAMenor(e)} placeholder='ordenar de Mayor a menor'>
                            <option default value=''>Ordenamiento Numerico</option>
                            <option value="menormayor">Menor a Mayor por Puntuacion</option>
                            <option value="mayormenor">Mayor a Menor por Puntuacion</option>
                        </select>
                    </div>
                        
                    <div>
                        <select onChange={(e) => orderAlfabetico(e)}>
                            <option default value=''>Ordenamiento Alfabetico</option>
                            <option value="asc">A - Z</option>
                            <option value="des">Z - A</option>
                        </select>
                    </div>
                    
                </div>


                <div className="group_Filter_Two">

                    <div>
                        <button onClick={mayorsetenta}>
                            Older 70
                        </button>
                    </div>

                    <button onClick={refresh}>Refresh</button>

                    <Search />

                </div>

            </div>

            <div className="container">
                {
                    currentRecipes.length > 0 ?
                    currentRecipes.map((e) => {// envio los datos a esta etiqueta
                        return (
                            <div className="container-div" key={e.id}>
                                <Cards
                                    id={e.id}
                                    imagen={e.imagen}
                                    nombre={e.titulo}
                                    tipoDieta={e.dieta}
                                    puntuacion={e.nivel}
                                />
                            </div>
                        )
                    }) :

                    <div>
                        <h2>Cargando...</h2>
                    </div>
                }
            </div>

            <Paginado
                setCurrentPage={setCurrentPage}// inicializacion de pagina
                totalPost={foodFull.length}// maximo de datos
                recipesPerPage={recipesPerPage}//numero de datos requeridos por pagina
                currentPage={currentPage}
            />
        
        </div>
       
    )
}

//const Info = (e) => {
//
//    e.preventDefault()
//
//    console.log("Hola mundo")
//}

/*

    <div className={styles.paginado}> 
        <Paginado
        recipesPerPage = {recipesPerPage}
        allRecipes = {foodsfull.length}
        paginado= {paginado}
        />
    </div> 
 */