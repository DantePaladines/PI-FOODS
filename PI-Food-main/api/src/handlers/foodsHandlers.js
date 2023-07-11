const { getAllFoods, getAllDiets, getIdRecipes, searchGetFood, deleteRecipes } = require('../controllers/foodsControllers.js')

const getsFoods = async (req, res) => {
    try {
        const { name } = req.query

        console.log(name)

        const result = name ? await searchGetFood(name) : await getAllFoods()

        if (!result) {
            res.status(500).json({error : "No se encuentraron los dato/s"})
        } else {
            res.status(200).json(result)
        }

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const getIdFood = async (req, res) => {
    try {
        const { id } = req.params // obtenemos el id de params 

        /* 
            este metodo tratara de convertir el dato en numero entero ==> false y si no es entero te retornara true
        */
        const source = isNaN(id) ? "db" : "api" 

        const receta = await getIdRecipes(id, source)

        if (!receta) {
            res.status(500).json({error : "El dato que estas buscando no se encuentra disponible"})
        } else {
            res.status(200).json(receta)
        }
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const getDiets = async (req, res) => {
    try {
        const dietas = await getAllDiets()

        if (!dietas) {
            res.status(500).json({error : "No se encontraron datos en la DB"})
        } else {
            res.status(200).json(dietas)
        }
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const deleteRecetas = async (req, res) => {

    try {

        const { id } = req.params

        const ident = isNaN(id) ? 'db': 'api'

        const result = await deleteRecipes(id, ident)

        //console.log(result, 'envio de la funcion')

        if (!result) {
            res.status(500).json({error : 'No hay datos en la db'})
        } else {
            res.status(204).json(result)
        }

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {
    getsFoods,
    getDiets,
    getIdFood,
    deleteRecetas
}

// los controladores de errores aun no estan terminados ,
// entramos al frontend