import express from 'express';
import { getAll,getById,create } from '../controller/RaceController.js';

const router = express.Router();

router.get('/',getAll);
router.post('/',create);
router.get('/:id',getById);

export default router;