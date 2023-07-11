require('dotenv').config()

const { Recipe, Dieta } = require('../db.js')

const axios = require('axios')
const { Op } = require('sequelize')

const {API_KEY} = process.env

const clearArray = (arr) => 
    arr.map((elem) => {
        return {
            id : elem.id,
            titulo : elem.title,
            imagen : elem.image,
            tipo : elem.dishTypes.map((d)=> {return{name:d}}),
            dieta : elem.diets.map((d)=> {return{name:d}}),
            resumen : elem.summary,
            nivel : elem.healthScore,
            paso : elem.analyzedInstructions.map((c) => c.steps.map((x) => x.step))
        }
    })


const getIdRecipes = async (id, source) => {

    if (source === 'api') {

        const unique = (
            await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
            ).data

        return {
            id : unique.id,
            titulo : unique.title,
            imagen : unique.image,
            tipo : unique.dishTypes.map((a)=> {return{name:a}}),// tipos de platos
            dieta : unique.diets.map((b)=> {return{name:b}}),// un array con los tipos de dieta de esa receta
            resumen : unique.summary, // resumen del plato
            nivel : unique.healthScore, // que tan saludable es
            paso : unique.analyzedInstructions.map((c) => c.steps.map((x) => x.step)) //me envia en un solo array todos los pasos
        }

    } else {
       const uniqueTwo = await Recipe.findByPk(id,{
            include : [{
                model : Dieta,
                attributes : ['name'],
                through : {attributes : []}
            }]
        })

        return uniqueTwo
    }
}

const getAllFoods = async () => {// creo una funcion de obtener todas las comidas 

    const getRecipes = await Recipe.findAll({
        include : [{
            model : Dieta,
            attributes : ["name"],
            through : {attributes : []}// no nos muestra los datos innecesarios como las tablas intermedias
        }],
    })

    const apiFoods = (await 
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
        ).data

    const apifull = clearArray(apiFoods.results)

    //console.log(apicall)

    return [...getRecipes, ...apifull]
}

const searchGetFood = async (name) => {

    const query = name.toLowerCase()
    console.log(query)

    const dataNameFood = await Recipe.findAll({

        where : {titulo : {[Op.iLike] : `%${query}%`}},// va a filtrar si encuentra algun titulo parecido al nombre que me pasan por query 
        include : [{                                //el % va en los dos lados para decir que lo contenga
            model : Dieta,
            attributes : ["name"],
            through : {attributes : []}// no nos muestra los datos innecesarios como las tablas intermedias
        }]
    })

    const apiNameRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
    ).data// hago la peticion a la api

    //console.log(apiNameRaw.results)

    const apifood = clearArray(apiNameRaw.results)// ejecuta la funcion colocando los datos como parametro

    //console.log(apifood, 'result')

    const letra = /[a-zA-Z]+/gi // hago la busqueda con una expresion regular (basica)(plus es que se repita una o mas veces)

    const apiName = apifood.filter((x) => {// filtro el array de objetos
        if (x.titulo.toLowerCase().includes(query.match(letra)) ) { // realizo una condicional 
            return x
        }
    })

    return [...dataNameFood, ...apiName]//retorno los datos haciendoles un autoguardado y concatenandolos ambos datos

    //console.log(apiName, "datos del segundo")
}

const deleteRecipes = async (id, ident) => {
    if (ident === 'api') {
        
        const apidelete = (
            await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=false`)
        ).data

        //console.log(apidelete.results, 'en objeto')

        const idApi = apidelete.results.map(x => {return x.id})

        //const arr = [apidelete]// todos las datos los guardo en este array, porque son objetos
        //console.log(arr, 'array')
//
        //const datoEliminado = arr.filter((a) => a.id !== id )
        ///* hago un recorrido a todos los datos, si cada uno de los datos cumplen con la condicion se muestra por pantalla el que no cumpla se elimina */
        //console.log(datoEliminado.map(x => {return x.results[0]}), 'datos pasados por filtrado')
        //return datoEliminado
            return idApi
    }else{

        const deleteRecipe = await Recipe.destroy({
            where : {
                id : id
            }
        })

        console.log(deleteRecipe)

        return deleteRecipe
        
    }
}

// funcion de obtener todas las dietas
const getAllDiets = async () => {
    // obtenemos todos los datos de la api foods
    const apidiets = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)

    // creo una nueva const donde estaria almacenando todos los datos
    const apiCallTwo = await apidiets.data.results.map(p => {
       return p.diets.map((name)=> {return {name} })// hago un recorrido a todas las dietas de los datos y los retorno en un objeto
    })

    //console.log(apiCallTwo, 'result')

    const element = apiCallTwo.flat()

    //console.log(element)

    for (const j in element) {
        
        if (element.hasOwnProperty(j)) {

            const dietsTwo = await Dieta.findOrCreate({
                where : {
                    name : element[j].name // extraigo el dato string del objeto para guardarlo en el modelo dieta
                }
            })
        }
    }

    const allDiets = await Dieta.findAll({})

    return allDiets
}

module.exports = {
    getAllFoods,
    searchGetFood,
    getAllDiets,
    getIdRecipes,
    deleteRecipes
}