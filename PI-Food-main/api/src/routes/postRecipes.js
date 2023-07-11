const express = require('express')

const { createPostHandlers } = require('../handlers/postRecipes.js')

const router = express.Router()

router.post('/', createPostHandlers)

module.exports = router