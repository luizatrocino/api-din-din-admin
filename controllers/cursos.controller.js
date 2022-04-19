const listaCursos = require("../models/cursos.json") //aqui estamos importando um array de cursos já cadastrados anterioremente
const fs = require('fs')

const CursoController = {
    cadastrarCurso (req,res) {
        
        //precisamos desestruturar o req.body, onde virão as informações que o usuário inseriu e que queremos
        const {titulo, descricao, professor} = req.body

        //testamos se alguns dos valores enviados está vazio/ou é undefined
        if(!titulo || !descricao || !professor){
            return res
            .status(400)
            .json({error: "Você precisa passar os atributos corretamente"}) //"error" é apenas uma chave aqui. Poderíamos escrever outro nome
        }

        //para criar um outro item do array no cursos json. A lista de cursos é atualizada, mas fica apenas na memória desse js
        listaCursos.push({
            titulo,
            descricao,
            professor
        })

        //Para levar isso para nosso arquivo JSON (precisa ser em formato json)
        
        fs.writeFileSync('../models/cursos.json', JSON.stringify(listaCursos))
        res.status(201).json({message: "Cadastro efetuado com sucesso"}) 
    }
}


module.exports = CursoController

