const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const NotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  todo: { type: [TodoSchema], default: [] },
});

const Notion = mongoose.model('Notion', NotionSchema);

module.exports = Notion;