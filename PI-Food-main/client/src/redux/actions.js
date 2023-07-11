import axios from "axios";
export const GET_ALL_FOOD = 'GET_ALL_FOOD'
export const GET_FOOD = 'GET_FOOD'
export const GET_DIETS = 'GET_DIETS'
export const FILTER_TYPE_DIETS = 'FILTER_TYPE_DIETS'
export const ORDER_PUNCTUATION = 'ORDER_PUNCTUATION'
export const ORDEN_ALFABETICO = 'ORDEN_ALFABETICO'
export const DELETE_RECIPES = 'DELETE_RECIPES'
export const MAYOR_SETENTA = 'MAYOR_SETENTA'
export const SEARCH_NAME = 'SEARCH_NAME'
//controladores de errores

export const ERROR_FORM = 'ERROR_FORM'

export const getFoods = () => {// nos conectamos con el servidor
    return async (dispatch) => {
        return await fetch(`http://localhost:3001/foods`)// hacemos la conexion mediante esta URL
        .then((response) => response.json())// capturamos el dato con una promesa (.then) y mediante una funcion anonima la transformamos a json
        .then((data) => {// capturamos el dato convertido en json para luego pasarla por una funcion
            dispatch({// ejecutamos el dispatch que nos estaria dando como datos un type y payload ==> "que tendriamos los datos de la db"
                type : GET_ALL_FOOD,
                payload : data
            })
        })
        .catch(e => console.log(e))// capturamos el error y lo imprime por consola
    }
}

export const getIdFood = (id) => {
    return async (dispatch) => {
        const apidata = await axios.get(`http://localhost:3001/foods/recipes/${id}`)
        dispatch({
            type : GET_FOOD,
            payload : apidata.data
        })
    }
}

export const getDiets = () => {
    return async (dispatch) => {
        const diets = await axios.get(`http://localhost:3001/foods/dietas`)
        dispatch({
            type : GET_DIETS,
            payload : diets.data
        })
    }
}

export function createRecipes(input) {
    return async function (dispatch) {
        try {
            const create = await axios.post(`http://localhost:3001/recipes`,input)
            return create
        } catch (error) {
            if (error.response) {
                dispatch({
                    type : ERROR_FORM,
                    payload : error.response.data
                })
                //console.log(error.response.data)
                //return error.response.data
            }
        }
    }
}

export function deleteRecipes(id) {
    return (dispatch) => {
        return fetch(`http://localhost:3001/foods/delete/${id}`,{method : 'DELETE'})// hago una peticion de tipo delete
        .then(data => {
            console.log(data)
            dispatch({
                type : DELETE_RECIPES,
                payload : id,// el id del parametro lo coloco como valor del payload
            })
            
        })
    }
}

export function searchByName(valor) {
    return async (dispatch) => {
       await fetch(`http://localhost:3001/foods?name=${valor}`)
       .then((response) => response.json())
       .then((nameData) => {
        dispatch({
            type : SEARCH_NAME,
            payload : nameData
       })
       })
       
    }
}

export function filterDiets(dato) {
    return {
        type : FILTER_TYPE_DIETS,
        payload : dato
    }
}

export function ordenByPunctuation(puntuacion) {
    return {
        type : ORDER_PUNCTUATION,
        payload : puntuacion
    }
}

export function ordenAlfabetico(letras) {
    return{
        type : ORDEN_ALFABETICO,
        payload : letras
    }
}

export function mayorSetenta(number) {
    return {
        type : MAYOR_SETENTA,
        payload : number
    }
}

//filterRecipesByTypeDiet