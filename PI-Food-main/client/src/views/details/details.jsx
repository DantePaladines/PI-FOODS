import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Detail from "../../components/detail/detail";

export default function Details () {

    const info = useSelector((state) => state.detalles) // en entrga un objeto 
    console.log(Array.isArray(info.dieta))// verifico si es verdad

    const arr = [info] // por lo tanto coloco en array para hacerle un recorrido
    console.log(arr)

    //const [detalle, setDetalle] = useState(info)

    const maximo = info.length // esta vacio

    console.log(maximo)
    //console.log(detalles.dieta.map((a) => {return a.name}))

    //useEffect(() => {
    //    setDetalle(info)
    //},[])

    const history = useHistory()

    function irAHome(e) {
        e.preventDefault()

        history.push("/Home")

    }

    return (
        <div>
            detalles de las foods
            {    
                <div>
                    <img src={arr[0].imagen} alt={arr[0].titulo} title={arr[0].titulo} />
                    <h2>{arr[0].titulo}</h2>
                    <ul>Tipo de Dieta : {arr[0].dieta ?.map((x) => {return <li key={x.name}>{x.name}</li>})}</ul>{/*pregunto si la matriz existe*/}
                    <ul>Tipo de Comida : {arr[0].tipo ?.map((z) => {return <li key={z.name}>{z.name}</li>})}</ul>
                    <p>resumen del Plato : {arr[0].resumen}</p>
                    <h3>Nivel de Comida Saludable : {arr[0].nivel}</h3>
                    <h4>Pasos : {arr[0].paso}</h4>
                </div>
            }

            <div>
                <button onClick={(e) => irAHome(e)}>
                    Ir a Home
                </button>
            </div>
        </div>
    )
}