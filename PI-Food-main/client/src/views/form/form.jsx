import React, { useDeferredValue, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipes, getDiets } from "../../redux/actions";
import './form.css'

export default function Form() {

    const dispatch = useDispatch()
    const listDiets = useSelector((state) => state.dieta)// cargo el estado de dietas
    const fail = useSelector((state) => state.errores)// traigo los errores del backend

    console.log(fail)

    console.log(listDiets)

    const [input, setInputs] = useState({
        titulo : "",
        resumen : "",
        nivel : "",
        paso : "",
        typeDiets : []
    })

    const [error, setError] = useState({})// este estado local es para, las validaciones del formulario controlado

    function handleSelect(e) {
        setInputs(
            {
                ...input,
                typeDiets : [...input.typeDiets, e.target.value]// los guardo en array todos los datos seleccionados
            }
        )
    }

    function handleInputChange(e) {
        //e.preventDefault()

        const {name, value} = e.target

        validate(
            {
                ...input,
                [name] : value
            }
        )

        setInputs(
            {
                ...input,// me sirve para guardar los datos anteriores que coloque
                [name] : value // de la propiedad del name agregar el value
            }
        )

        console.log(input)
    }

    function validate(input) {

        let nombre = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
        let number = /^[0-9]+$/

        if(number.test(input.nivel.trim())){// validacion de numeros
            setError(error.nivel = "")
        }
        if(input.nivel === "") {
            setError(error.nivel = 'puntuacion vacia')
        }
        else if (input.nivel > 100) {                                                                // errores bugueados
            setError(error.nivel = 'no puedes colocar una puntuacion mayor a cien')
        }

        if(nombre.test(input.titulo.trim())) { // validacion de letras separadas
            setError(error.titulo = '')
        }
        else if(input.titulo === "") {
            setError(error.titulo = 'Necesitas colocar un titulo')
        }
        else{
            setError(error.titulo = "no puedes colocar numeros o signos en el titulo")
        }

        if (nombre.test(input.paso.trim())) {
            setError({...error,paso : ""})
        }
        else if(input.paso === '') {
            setError({...error,paso : "Necesitas colocar el paso a paso de la receta"})
        }
        
        if (nombre.test(input.resumen.trim())) {
            setError({...error, resumen : ""})
        }
        else if(input.resumen === '') {
            setError({...error, resumen : "Necesitas colocar un resumen"})
        }
    }

    function enviarDatos(e) {
        e.preventDefault()// evita que la pagina se recargue

        dispatch(createRecipes(input))

        console.log("dato enviado")
        
        console.log(input)
    }

    function datoEnviado(e){
        //e.preventDefault()
        if(!fail.error) {
            alert("Receta Creada")
        }else{
            alert(fail.error)
        }
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    let styles ={
        fonWeight : "bold",
        color : "red"
    }
    
    return(
        <form className="form_create" onSubmit={(e) => enviarDatos(e)}>
            <h2 className="form__title">Crea tu Receta Preferida</h2>

            <div className="form_container">
                <div className="form__group">
                    <label className="form__label">Nombre del Plato : </label>
                    <input className="form__input" placeholder="Titulo de Plato" type="text" name="titulo" value={input.titulo} onChange={(e) => handleInputChange(e)} />
                    {error.titulo && <span style={styles} className="form__line">{error.titulo}</span>}
                </div>
                <div className="form__group">
                    <label className="form__label">Resumen del plato : </label>
                    <textarea className="form__input" placeholder="resumen" type="text" name="resumen" value={input.resumen} onChange={(e) => handleInputChange(e)} />
                    {error.resumen && <span style={styles} className="form__line">{error.resumen}</span>}
                </div>
                <div className="form__group">
                    <label className="form__label">Nivel de comida saludable : </label>
                    <input className="form__input" placeholder="Nivel de Comida" type="number" name="nivel" value={input.nivel} onChange={(e) => handleInputChange(e)} />
                    {error.nivel && <span style={styles} className="form__line">{error.nivel}</span>}{/*si existe o se evalua en true retorna la que hay en la derecha*/}
                </div>
                <div className="form__group">
                    <label className="form__label">Pasos de Preparacion : </label>
                    <textarea className="form__input" placeholder="preparacion" type="text" name="paso" value={input.paso} onChange={(e) => handleInputChange(e)} />
                    {error.paso && <span style={styles} className="form__line">{error.paso}</span>}
                </div>
                <div className="form__group">
                    <label className="form__label">Tipos de dietas</label>
                    <select className="form__input" multiple onChange={(e) => handleSelect(e)}>
                        {
                            listDiets?.map((x) => {
                                return <option key={x.id} value={x.name} >{x.name}</option>
                            })
                        }
                    </select>
                </div>
                <button 
                    className="form__submit"
                    type="submit"
                    onClick={(e) => datoEnviado(e)}
                >
                    Crear receta
                </button>
            </div>
        </form>
    )
}


{/*<div>  esto sirve para la relacion de dietas
    <label>Elige el tipo de dieta : </label>
    <select onChange={(e) => handleSelect(e)} placeholder="Selecciona la Dieta">
        <option>Selecciona la Dieta</option>
        {
            listDiets?.map((t) => {
                return <option key={t.id} value={t.name}>{t.name}</option>
            })
        }
    </select>
</div>*/}