import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//  post add new todo
router.post("/", async (req, res) => {
  const {text} = req.body;
  const newTodo = new Todo({text});
  await newTodo.save();
  res.json(newTodo);
});

export default router;