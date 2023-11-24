const express = require("express") // Primeiro passo foi importar o express no JS 
const uuid = require("uuid")
const cors = require("cors")


// import express from "express";
// import { v4 } from "uuid";
// import cors from "cors"


const port = 3001
const app = express() // segundo passo foi cirar uma variável para nos ajudar a desenvolver o express de maneira fácil, só digitando app
app.use(express.json())
app.use(cors())


    //formato de cada requisições: 
            //Query params => meusite.com/produto?celular=iphone&valor=3500 //FILTROS
            //Route Params => /users/2    //BUSCAR, DELETAR  OU ATUALIZAR ALGO ESPECÍFICO
            //Request body => { "name": "david", "age": }




const users = []

    const checarIDDoUsuario = (request, response, next) =>{
        const {id} = request.params

        const index = users.findIndex(item => item.id === id )

        if(index < 0){
            return response.status(404).json({message: "not found"})
        }

        request.userIndex = index
        request.userId= id 
        next()

    }



    app.get("/users", (request, response)=>{

        return response.json(users)

    }) 


    app.post("/users", (request, response)=>{

        const {name,age} = request.body
        // console.log(request)

        const userId = {id: uuid.v4(), name: name, age: age}

        users.push(userId)

        // return response.status(201).json(users)
        return response.status(201).json([userId]);

        
    }) 




    app.put("/users/:id",checarIDDoUsuario, (request, response)=>{


       const id = request.userId

        const {name, age } = request.body

        const updateUsers = {id, name, age}

        const index  = request.userIndex
       


        users[index] = updateUsers


        return response.json(updateUsers)

    }) 



    app.delete("/users/:id",checarIDDoUsuario, (request, response)=>{

        const index  = request.userIndex
        users.splice(index,1)

console.log(index)


        return response.status(204).json()

    }) 









    
app.listen(port, ()=>{
    console.log("Server started on port 3001")
})                                                                




        // body params  
        // const {name, age} = request.body
        // console.log(request)
        // return response.json({name, age})

        // const users = request.params   -Route params

         //Route params
        // return response.json({users: users})


        //Query params
        // const celular = request.query.celular
        // const valor = request.query.valor
        //        const {celular, valor} = request.query

        //Query params
        // return response.json({celular: celular, valor: valor})
        // return response.json({celular, valor})
        
        // Quarto passo foi criar minha ROTA, Toda vez que alguem acessar meu "users" ira leva-lo para esse return que tem meu response/ ROTA do tipo GET 
