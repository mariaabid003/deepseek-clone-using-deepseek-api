import express from 'express'
import { sendPromt } from '../controllers/promt.controller.js';
import userMiddleware from '../middleware/promt.middlware.js';



const router= express.Router();

router.post("/promt",userMiddleware ,sendPromt);



export default router;