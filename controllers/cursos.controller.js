const listaCursos = require("../models/cursos.json") //aqui estamos importando um array de cursos já cadastrados anterioremente
const fs = require('fs')


const CursoController = {
    cadastrarCurso (req,res) {
        
        //precisamos desestruturar o req.body, onde virão as informações que o usuário inseriu e que queremos
        const {id, titulo, descricao, professor} = req.body

        //testamos se alguns dos valores enviados está vazio/ou é undefined
        if(!id || !titulo || !descricao || !professor){
            return res
            .status(400)
            .json({error: "Você precisa passar os atributos corretamente"}) //"error" é apenas uma chave aqui. Poderíamos escrever outro nome
        }

        //para criar um outro item do array no cursos json. A lista de cursos é atualizada, mas fica apenas na memória desse js
        listaCursos.push({
            id,
            titulo,
            descricao,
            professor
        })

        //Para levar isso para nosso arquivo JSON (precisa ser em formato json)
        
        fs.writeFileSync('./models/cursos.json', JSON.stringify(listaCursos)) //colocamos só um ponto na hora de colocar o caminho, por que ele vai diretamente na raiz do projeto
        res.status(201).json({message: "Cadastro efetuado com sucesso"}) 
    },

    listarCurso (req, res){
        fs.readFile('./models/cursos.json', 'utf-8', (error,data)=>{
            res.send(data)  // por que não pode ser 'json' ao invés de 'send'
           
        })

        res.status(200)    
    },
       
    deletarCurso (req, res){
         const {id} = req.params

        fs.readFile('./models/cursos.json','utf-8',(error,data)=>{
            
            const listagem = JSON.parse(data)

            for (var i=0; i<listagem.length; i++){
                
                if (listagem[i].id == id){
                   listagem.splice(i,1)
                }
            }

            fs.writeFileSync('./models/cursos.json', JSON.stringify(listagem))
            res.status(204) 
         })
         
    }


}


module.exports = CursoController

