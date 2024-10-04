const express = require('express');
const router = express.Router();
const clubs = require('../controllers/clubs')

router.post('/', clubs.createClub);
router.put('/act/:id', clubs.updateClub);
router.get('/', clubs.getAllClubs);
router.delete('/delete/:id', clubs.deleteClub);


module.exports = router;
