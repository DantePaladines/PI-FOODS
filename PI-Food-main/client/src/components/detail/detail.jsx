import React from "react";
import { useHistory } from "react-router-dom";

export default function Detail({imagen, titulo, dietas}) {

    const history = useHistory()

    console.log(dietas)

    function principal() {
        history.push("/Home")
        console.log("Hola mundo")
    }

    return(
        <div>
            <img src={imagen} alt={titulo} title={titulo} />
            <h2>{titulo}</h2>
            <ul><li>{dietas}</li></ul>

            <div>
                <button onClick={principal}>
                    Ir a Home
                </button>
            </div>
        </div>
    )
}