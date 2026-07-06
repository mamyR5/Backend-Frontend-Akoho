import express from 'express';
import {getAll,create,edit} from '../controller/EtatAtodyController.js';
const router = express.Router();

router.get('/',getAll);
router.post('/',create);
router.post('/:id',edit);

export default router;
