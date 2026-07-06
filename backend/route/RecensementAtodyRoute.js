import express from 'express';
import {getAll,create} from '../controller/RecensementAtodyController.js';
const router = express.Router();
router.get('/',getAll);
router.post('/',create);
export default router;