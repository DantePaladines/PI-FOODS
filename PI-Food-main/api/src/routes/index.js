const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const foodsRouter = require('./foodsRouter.js')
const postRecipes = require('./postRecipes.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/foods', foodsRouter)
router.use('/recipes', postRecipes)


module.exports = router;
