const express = require('express');
const router = express.Router();
const member = require('../controllers/members')

router.post('/', member.createMember);
router.put('/act/:id', member.updateMember);
router.get('/', member.getAllMembers);
router.delete('/delete/:id', member.deleteMember);

module.exports = router;
