const express = require('express');
const router = express.Router();
const coment = require('../controllers/coment');
const { verifyToken } = require('../controllers/users');

router.post('/coment', verifyToken,coment.createComent);
router.get('/coment',verifyToken, coment.getAllComents);
router.get('/coment/club/:clubId',verifyToken, coment.getComentsByClubId)
router.put('/coment/:id',verifyToken, coment.updateComent);
router.delete('/coment/delete/:id',verifyToken, coment.deleteComent);
router.get('/members/:userId/club/:clubId', coment.getMemberId);

module.exports = router;