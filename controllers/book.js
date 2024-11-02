const { Book } = require('../models');

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookByUser = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { user_Id: req.userId } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
      const book = await Book.findByPk(req.params.id);
      if (!book) {
          return res.status(404).json({ message: 'Libro no encontrado' });
      }
      res.json(book);
  } catch (error) {
      console.error("Error al obtener el libro:", error);
      res.status(500).json({ message: 'Error al obtener el libro' });
  }
};

const updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getBookByUser,
  getBookById,
  updateBook,
  deleteBook
};
