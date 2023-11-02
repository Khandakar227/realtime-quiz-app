import express from 'express';
import { addAdmin, getAdmin } from '../controllers/admin';
import dotenv from 'dotenv';

dotenv.config();

const adminRoute = express.Router();
adminRoute.get("/", getAdmin);

if(process.env.ENVIRONMENT == 'development') adminRoute.post("/", addAdmin);

export default adminRoute;
