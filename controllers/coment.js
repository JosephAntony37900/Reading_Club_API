const {Coment, User, Member, Club} = require('../models');

const createComent = async(req, res) => {
    try{
      const coment = await Coment.create(req.body);
      res.status(201).json(coment)
    } catch(error) {
      res.status(500).json({ error: error.message});
    }
};

const getAllComents = async(req, res) => {
    try{
      const coments = await Coment.findAll();
      res.status(200).json(coments)
    } catch (error){
      res.status(500).json({ error: error.message});
    }
}

const getComentById = async(req, res) => {
    try{ 
    const coment = await Coment.findByPk(req.params.id);
    if(coment){
        res.status(200).json(coment);
    } else {
        res.status(404).json({ error: 'Coment not found'})
    }
   } catch(error){
    res.status(500).json({ error: error.message});
   }
}

const updateComent = async(req, res) => {
    try { 
      const [update] = await Coment.update(req.body, {
        where: {id: req.params.id}
      });
    if(update){
        const updateComent = await Coment.findByPk(req.params.id);
        res.status(200).json(updateComent);
    } else {
        res.status(404).json({ error: 'Coment not found'});
    }
    } catch (error){
        res.status(500).json({ error: error.message});
    }
}

const deleteComent = async(req, res) => {
    try { 
    const deleted = await Coment.destroy({
        where: { id: req.params.id}
    });
    if(deleted){
        res.status(204).json();
    } else {
        res.status(404).json({ error: 'Coment not found'});
    }
    } catch (error){
        res.status(500).json({ error: error.message})
    }
}

const getComentsByClubId = async (req, res) => {
    try {
        const coments = await Coment.findAll({
            where: { idClub: req.params.clubId },
            include: [
                {
                    model: Member,
                    include: {
                        model: User,
                        attributes: ['name_User']
                    }
                }
            ]
        });
        res.status(200).json(coments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMemberId = async (req, res) => {
    try {
        const member = await Member.findOne({
            where: {
                userId: req.params.userId, // Asegúrate de que 'userId' es un campo válido en el modelo Member
                clubId: req.params.clubId  // Asegúrate de que 'clubId' es un campo válido en el modelo Member
            }
        });
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createComent,
    getAllComents,
    getComentById,
    updateComent,
    deleteComent,
    getComentsByClubId, 
    getMemberId
};