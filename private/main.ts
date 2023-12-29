import express from 'express'
import expressSession from 'express-session'
import {Client} from 'pg';
import dotenv from 'dotenv';

// import path from 'path';
import { isLoggedIn } from './guard';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make Connection to Database
dotenv.config();

export const client = new Client({
  database: process.env.DB_NAME, 
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

client.connect();

//set up session
app.use(
	expressSession({
		secret: 'wsp',
		resave: true,
		saveUninitialized: true
	})
  )


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})