import express from 'express';
import {getAll,getById,create,getAgeSemaine,getNbAkohoTotal,getAllSituationLot,getPoidsMoyenAndSakafoParSem, getSituationLot, getNbPondaisonMax, getPerteActuel} from '../controller/LotController.js';
const router = express.Router();

router.get('/',getAll);
router.get('/:id',getById);
router.post('/',create);
router.post('/situation/age',getAgeSemaine);
router.post('/situation/nbAkohoTotal',getNbAkohoTotal);
router.post('/situation/variation',getPoidsMoyenAndSakafoParSem);
router.post('/situationUnitaire',getSituationLot);
router.post('/situationUnitaire/NbPondaisonMax',getNbPondaisonMax);
router.post('/situationUnitaire/Perte',getPerteActuel);
router.post('/situation',getAllSituationLot);
export default router;
