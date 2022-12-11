import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { AppDataSource } from './orm';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3001;
const app = express();

AppDataSource.initialize().then(async () => {
}).catch((err) => {
    console.log(err);
});


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload())

//Routes
app.use(userRoutes);


//Starting the server
app.listen(PORT);