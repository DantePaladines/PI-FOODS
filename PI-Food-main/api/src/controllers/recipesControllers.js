const { Recipe, Dieta } = require('../db.js')
// falta crear y guardar dietas a la base de datos para poder relacionarlas
const createPostRecipe = async (titulo, resumen, nivel, paso, typeDiets) => {
    const newRecipe = await Recipe.create({// se creo la receta en el modelo de recipes
        titulo,
        resumen,
        nivel,
        paso
    });
    // typeDiets es un array puro
    console.log(typeDiets, "tipo de dieta")

    const dieta = typeDiets.map((name) => {
        console.log(name, "dieta")
        return {name}// me devuelve un array de objetos
        
    })

    console.log(dieta)

    console.log(Array.isArray(dieta), "dietaDos")
    console.log(dieta.filter(a => a))

    for (const i in dieta) {
        console.log(dieta[i].name, "for in")// me entrga objetos puros o entrando a las propiedades solo me entraga los valores de las propiedades

        const relationDiets = await Dieta.findOne({// realiza una busquedad en el modelo de dieta el tipo de dieta 
            where : {
                name : dieta[i].name
            }
        })

        newRecipe.addDieta(relationDiets)// finalmente hace la relacion de receta y el tipo de dieta que lleva
    }
}

module.exports = {
    createPostRecipe
}