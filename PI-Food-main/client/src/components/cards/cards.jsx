import React from "react";
import "./cards.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getIdFood, deleteRecipes } from "../../redux/actions.js";

export default function Cards({id, imagen, nombre, tipoDieta, puntuacion}) {

    //const foods = useSelector((state) => state.food) extraigo los datos y los guardo en esta const "foods"

    //paginado del home
    const history = useHistory()

    const dispatch = useDispatch()

    function Info(e) {
        history.push('/details')

        dispatch(getIdFood(id))
    }

    function eliminar(e) {
        e.preventDefault()
        console.log('dato eliminado')
        dispatch(deleteRecipes(id))
        alert('Receta eliminada')
    }

    return (
        <div key={id} className="cards">
            <button className="btn_delete" onClick={(e) => eliminar(e)}>X</button>
            <img className="img" src={imagen} alt={nombre} title={nombre} />
            <h3 className="titulo"> Platillo : {nombre} </h3>
            <ul className="lista"> Tipos de Dieta : {tipoDieta.map((b) => {return <li key={b.name}>{b.name}</li> })} </ul> {/*le coloco un key al <p> para para crear una relación entre el componente y el elemento DOM */}
            <p>Puntuacion : {puntuacion}</p>
            <button onClick={(e) => Info(e)}>Detalles</button>
        </div>
    )
}