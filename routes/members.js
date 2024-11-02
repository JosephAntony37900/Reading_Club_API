const express = require('express');
const router = express.Router();
const member = require('../controllers/members')
const { verifyToken } = require('../controllers/users');

router.post('/members',verifyToken, member.createMember);
router.put('/members/:id',verifyToken, member.updateMember);
router.get('/members',verifyToken, member.getAllMembers);
router.delete('/members/delete/:id',verifyToken, member.deleteMember);
//router.post('/members/join', verifyToken, member.joinClub);

module.exports = router;
