import { 
    GET_ALL_FOOD, 
    GET_FOOD, GET_DIETS, 
    FILTER_TYPE_DIETS, 
    ORDER_PUNCTUATION, 
    ORDEN_ALFABETICO, 
    DELETE_RECIPES, 
    ERROR_FORM, 
    MAYOR_SETENTA,
    SEARCH_NAME
} from "./actions.js";

const initialState = {
    food : [],// todos los datos en general
    detalles : [],// detalles de cada dato
    dieta : [],// todas las dietas existentes en la api
    recipes : [],// se guardan todos los datos (que despues se actualizaran)
    search : [],
    errores : []
}
console.log(initialState.typeDiets)

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_FOOD:
            return {
                ...state,// autoguardado del estado 
                food : action.payload, // guardamos los datos extraidos de la consulta
                recipes : action.payload
            }
        
        case GET_FOOD:
            return {
                ...state,
                detalles : action.payload
            }

        case GET_DIETS:
            return{
                ...state,
                dieta : action.payload
            }
            
        case FILTER_TYPE_DIETS:
            //const allRecipes = state.food

            console.log(state.food, 'reducer')

            const typeDietFilter = action.payload === 'Todas las Recetas' ? state.food : state.food.filter(t => t.dieta.find(e => e.name === action.payload))
            
            console.log(typeDietFilter, 'reducer')
            console.log(action.payload, 'reducer')
            return {
                ...state,
                recipes : typeDietFilter
            }

        case ORDER_PUNCTUATION:
            const orderPunt = action.payload === 'menormayor' ?

            state.recipes.sort((a, b) => {
                if (a.nivel < b.nivel) { // ascendente
                    return -1 // a -- b
                }
                if (a.nivel > b.nivel) {
                    return 1 // b -- a
                }
                return console.log(0) // si son iguales se devuelve cero
            }):
            state.recipes.sort((a, b) => {// descendente 
                if (a.nivel > b.nivel) {
                    return -1 // b -- a
                }
                if (a.nivel < b.nivel) {
                    return 1 // a -- b
                }
                return console.log(0)
            })

            return {
                ...state,
                recipes : orderPunt
            }

        case ORDEN_ALFABETICO:
            const ordenAlfa = action.payload === 'asc'?

            state.recipes.sort((a, b) => {
                if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
                    return -1
                }
                if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
                    return 1
                }
                return 0
            }):
            state.recipes.sort((a, b) => {
                if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
                    return -1
                }
                if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
                    return 1
                }
                return 0
            })
            return{
                ...state,
                recipes : ordenAlfa
            }

        case DELETE_RECIPES:

            const eliReceta = state.recipes.filter(a => a.id !== action.payload)// se hace una comparacion de recipes y id de action 
            return {
                ...state,
                recipes : eliReceta
            }

        case ERROR_FORM:
            return {
                ...state,
                errores : action.payload
            }

        case MAYOR_SETENTA:

            const mayorSetenta = state.food.filter(a => a.nivel > action.payload)// no muestra los que no cumplen ls condicion
            
            return {
                ...state,
                recipes : mayorSetenta
            }

        case SEARCH_NAME:

            console.log(action.payload)

            //const filtrado = !action.payload ? "" : action.payload

            return {
                ...state,
                search : action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer