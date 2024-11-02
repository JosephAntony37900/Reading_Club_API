const express = require('express');
const router = express.Router();
const clubs = require('../controllers/clubs')
const { verifyToken } = require('../controllers/users');

router.post('/clubs',verifyToken, clubs.createClub);
router.put('/clubs/:id',verifyToken, clubs.updateClub);
router.get('/clubs',verifyToken, clubs.getAllClubs);
router.get('/club/:id',verifyToken, clubs.getClubById);
router.delete('/clubs/delete/:id',verifyToken, clubs.deleteClub);
router.get('/clubs/user', verifyToken, clubs.getClubsByUser);
router.get('/clubs/member', verifyToken, clubs.getClubsAsMember);
router.post('/members/join', verifyToken, clubs.joinClub) //nueva ruta


module.exports = router;
