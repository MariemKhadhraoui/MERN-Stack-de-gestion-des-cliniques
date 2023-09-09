const express = require('express');
const router = express.Router();
const cliniqueController = require('../controllers/rendezVousController');

router.post('/add', cliniqueController.createRendezVous);

router.put('/put/:id', cliniqueController.updateRendezVous);

router.get('/get/:id', cliniqueController.getRendezVous);

router.get('/get', cliniqueController.getAllRendezVous);

router.delete('/delete/:id', cliniqueController.deleteRendezVous);


router.get('/search', cliniqueController.searchRendezVous);

router.put('/accepter/:id', cliniqueController.accepterRendezVous);
router.put('/refuser/:id', cliniqueController.refuserRendezVous);

module.exports = router;
