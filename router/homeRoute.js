
const express = require('express');
const router = express.Router();
const Todo = require("../model/todo");
const auth = require("../middleware/auth");

router.use(auth)

router.get("/todo", async (req, res) => {
  const { email } = req.user;
  const db_todo = await Todo.findOne({ email });
  return res.status(200).json(db_todo);
});

router.post("/todo", async (req, res) => {
  try {
    const { email } = req.user;
    const { item, done } = req.body;
    console.log(`${email} is ${item} and is done:${done}`)
    if (!(email && item)) {
      return res.status(400).send("All input is required");
    }

    const db_todo = await Todo.findOne({ email });
    if (db_todo) {
      db_todo.todos.push({ item });
      await db_todo.save();
      return res.status(200).json(db_todo);
    } else {
      const todos = await Todo.create({ email, todos: { item, done } });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    const { email } = req.user;
    const id=req.params.id
    if (!(email && id)) {
      return res.status(400).send("All input is required");
    }
    const db_todo = await Todo.findOne({ email });
    if (db_todo) {
      const todo_list=db_todo.todos;
      todo_list.splice(id, 1)
      todo_list.todos=[...todo_list];
      await db_todo.save();
      return res.status(201).json(db_todo);
    }else{
      return res.status(500).json({ message: "Internal server error" });
    } 
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router