const { createPostRecipe } = require('../controllers/recipesControllers.js')

const createPostHandlers = async (req, res) => {
    try {
        const { titulo, resumen, nivel, paso, typeDiets } = req.body// capturo los valores que llegan por body

        if (!titulo || !resumen || !nivel || !paso || !typeDiets ) {// controlo el error si en algun momento los campos no estan completados
            res.status(400).json({error : "Porfavor completa todos los campos"})// lanzo este mensaje de error
        }else{
            newPost = await createPostRecipe(titulo, resumen, nivel, paso, typeDiets)// si los campos estan completados ejecuto esta funcion
        }

        res.status(201).json({message : "La receta fue creada"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {
    createPostHandlers
}