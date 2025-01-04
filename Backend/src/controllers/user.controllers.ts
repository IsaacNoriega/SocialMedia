import { Request , Response } from "express";
import statusResponse from "../utils/status-response"; // Status de las llamadas
import hashPassword from "../utils/hash-password"; // Hash de la Pwd
import User from "../models/users.model"; // Esquema del usuario
import jwt from "jsonwebtoken"; // Esto se usara para el token


class UserControllers{

    //Post para crear el usuario
    signUp( req : Request , res : Response) : void {
        const pwd = req.body.password
        //Recibimos los datos del usuario
        const data = {
            name : req.body.name , 
            username : req.body.username ,
            email : req.body.email,
            password : hashPassword(req.body.password) , 
            gender : req.body.gender , 
            birthday : req.body.birthday
        }
        console.log(`Password antes de hash ${pwd} , despues de hash : ${data.password}`);

        // Creamos el nuevo usuario en la DB
        User.create(data).then(response => {
            res.status(statusResponse.SUCCESS).send('Sign Up Success')
        }).catch( e => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })
    }

    //Post para el inicio de sesion
    signIn( req : Request , res : Response) : void {
        const userData = {
            email : req.body.email ,
            password : hashPassword(req.body.password) 
        }

        User.findOne({ 
            email : userData.email , 
            password : userData.password }
        ).then( response => {
            if(response){ // Si encuentra al usuario , se toman datos para el token

                const tokenData = {
                    id : response.id , 
                    name : response.name , 
                    email : response.email , 
                    password : response.password
                }
                const token = jwt.sign(tokenData , process.env.TOKEN_KEY) // Se crea el token
                res.status(statusResponse.SUCCESS).send('Log In Success');
            }else {
                res.status(statusResponse.NOT_FOUD).send('User not found');
            }
        }).catch( e => {
            res.status(statusResponse.BAD_REQUEST).send('Something went wrong')
        })
    }

    // Get para los amigos 
}

export default new UserControllers();