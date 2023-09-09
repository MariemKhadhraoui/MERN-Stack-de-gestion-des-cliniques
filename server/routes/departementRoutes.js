const express = require('express');
const router = express.Router();
const cliniqueController = require('../controllers/deppartementController');


router.post('/add', cliniqueController.createDept);


router.put('/put/:id', cliniqueController.updateDept);


router.get('/get/:id', cliniqueController.getDept);


router.get('/get', cliniqueController.getAllDept);


router.delete('/delete/:id', cliniqueController.deleteDept);


router.get('/search', cliniqueController.searchDept);

module.exports = router;
