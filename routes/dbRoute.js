import express from 'express'
import {userModel} from '../models/Users.js'
import {productQuery} from '../models/productModels.js'

const router = express.Router();

router.get('/user' , userModel)
router.get('/product' , productQuery)

export default router; 