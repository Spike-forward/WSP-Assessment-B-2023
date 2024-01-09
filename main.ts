import express from 'express'
import expressSession from 'express-session'
import {Client} from 'pg';
import dotenv from 'dotenv';
import { isLoggedIn } from './guard';
import { loginRoutes } from './routes/loginRoutes';
dotenv.config();
declare module "express-session" {
  interface SessionData {
    owner?: string;
    owner_id: number
  }
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make Connection to Database

app.use(express.static("public"));
app.use(isLoggedIn,express.static("private"));

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

app.use("/login", loginRoutes)
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`)
})