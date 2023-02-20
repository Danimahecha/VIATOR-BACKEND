import {Router} from 'express';
import { getAirlines, createAirline, updateAirline, deleteAirline, getAirline } from '../controllers/airlines.controllers.js';

const router = Router();


router.get('/airlines',getAirlines)
router.post('/airlines',createAirline)
router.put('/airlines/:id',updateAirline)
router.delete('/airlines/:id',deleteAirline)
router.get('/airlines/:id',getAirline)

export default router ;