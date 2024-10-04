const { Club } = require('../models');

const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClubById = async (req, res) => {
  try {
    const Club = await Club.findByPk(req.params.id);
    if (Club) {
      res.status(200).json(Club);
    } else {
      res.status(404).json({ error: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClub = async (req, res) => {
  try {
    const [updated] = await Club.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedClub = await Club.findByPk(req.params.id);
      res.status(200).json(updatedClub);
    } else {
      res.status(404).json({ error: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteClub = async (req, res) => {
  try {
    const deleted = await Club.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub
};
