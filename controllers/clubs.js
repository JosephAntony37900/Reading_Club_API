const { Club, Member } = require('../models'); 

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
    const club = await Club.findByPk(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club no encontrado' });
    }
    res.json(club);
  } catch (error) {
    console.error("Error al obtener el club:", error);
    res.status(500).json({ message: 'Error al obtener el club' });
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
    // Eliminar comentarios relacionados
    await Comment.destroy({
      where: { idClub: req.params.id }
    });
    
    // Luego eliminar el club
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


// Obtener clubes creados por el usuario autenticado
const getClubsByUser = async (req, res) => {
  try {
    const clubs = await Club.findAll({ where: { idOwner: req.userId } });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener clubes en los que el usuario es miembro
const getClubsAsMember = async (req, res) => {
  try {
    const memberships = await Member.findAll({ where: { idUser: req.userId } });
    const clubIds = memberships.map(membership => membership.idClub);
    const clubs = await Club.findAll({ where: { id: clubIds } });
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para unirse a un club
const joinClub = async (req, res) => {
  try {
    const { idClub, email, age } = req.body;
    const member = await Member.create({
      idUser: req.userId,
      idClub,
      email,
      date: new Date().toISOString().split("T")[0], // Esto dará el formato 'YYYY-MM-DD'
      age
    });
    res.status(201).json(member);
  } catch (error) {
    console.log(new Date())
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
  getClubsByUser,
  getClubsAsMember,
  joinClub 
};
