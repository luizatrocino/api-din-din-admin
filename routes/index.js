const express = require("express")
const CursoController = require ("../controllers/cursos.controller")

const routes = express.Router()

routes.post("/cursos", CursoController.cadastrarCurso)

module.exports = routes