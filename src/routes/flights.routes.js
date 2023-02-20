import { Router} from 'express';
import { getFlights,createFlight ,updateFlight,getFlight, deleteFlight} from '../controllers/flights.controllers.js'

const router = Router ();

router.get('/flights', getFlights);
router.post('/flights', createFlight);
router.put('/flights/:id',updateFlight);
router.delete('/flights/:id',deleteFlight);
router.get('/flights/:id',getFlight );



export default router;