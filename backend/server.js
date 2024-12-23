const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Notion = require('./models/notion');

const app = express();
const PORT = 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb';


app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Backend is running!');
});


app.get('/notion-list', async (req, res) => {
  try {
    const notions = await Notion.find();

    res.status(200).send({
      status: 'success',
      message: 'Заметка успено создана',
      notions
    });
  } catch (error) {
    console.error('Error fetching notions:', error.message);
    res.status(500).send({
      status: 'error', message: 'Ошибка в получении заметок',
      message: error.message,
    });
  }
});

app.post('/add-notion', async (req, res) => {
  try {
    const notion = new Notion({
      title: req.body.title,
      todo: req.body.todo
    });
    await notion.save();

    res.status(200).send({
      status: 'success',
      message: 'Заметка успено создана'
    });
  } catch (error) {
    console.error('Error creating notion:', error.message);
    res.status(500).send({
      status: 'error', message: 'Ошибка в создании заметки',
      message: error.message,
    });
  }
});

app.delete('/delete-notion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotion = await Notion.findByIdAndDelete(id);

    res.status(200).send({
      status: 'success',
      message: 'Заметка успено удалена',
    });
  } catch (error) {
    console.error('Error deleting notion:', error.message);
    res.status(500).send({
      status: 'error',
      message: error.message,
    });
  }
});

app.put('/edit-notion/:id', async (req, res) => {
  try {
    const updatedNotion = await Notion.findByIdAndUpdate(
      req.params.id,
      { $set: { title: req.body.title, todo: req.body.todo } },
      { new: true, runValidators: true, overwrite: true }
    );

    res.status(200).send({
      status: 'success',
      message: 'Заметка успешно отредактирована',
    });
  } catch (error) {
    console.error('Error updating notion:', error.message);
    res.status(500).send({
      status: 'error',
      message: error.message,
    });
  }
});


app.get('/notion/:id', async (req, res) => {
  try {
    const notion = await Notion.findById(req.params.id);

    res.status(200).send({
      status: 'success',
      message: 'Заметка успешно загружена',
      notion
    });
  } catch (error) {
    console.error('Error fetching notion:', error.message);
    res.status(500).send({
      status: 'error',
      message: error.message,
    });
  }
});