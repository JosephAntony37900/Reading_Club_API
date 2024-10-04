const { Member } = require('../models');

const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const Member = await Member.findByPk(req.params.id);
    if (Member) {
      res.status(200).json(Member);
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const [updated] = await Member.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedMember = await Member.findByPk(req.params.id);
      res.status(200).json(updatedMember);
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteMember = async (req, res) => {
  try {
    const deleted = await Member.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember
};
