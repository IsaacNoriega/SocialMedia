//Importaciones de Librerias
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';



//Environment
dotenv.config();

//Puertos
const port = process.env.PORT || 3000;
const dburl = process.env.DB_URL

//Instacia
const app = express();

mongoose.connect(dburl).then( () => {
    console.log('Connected to db')
    app.listen( port , () => {
        console.log('App is running in port '+ port );
    })
}).catch( e => {
    console.log('Failed to connect to db')
})