const express = require('express')
 
const { getsFoods, getDiets, getIdFood, deleteRecetas } = require('../handlers/foodsHandlers.js')

const router = express.Router()

router.get('/dietas', getDiets)

router.delete('/delete/:id', deleteRecetas)

router.get("/recipes/:id", getIdFood)

router.get('/', getsFoods)


module.exports = router