import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Create a new todo
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  const newTodo = await prisma.todo.create({
    data: { title, description },
  });
  res.json(newTodo);
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, description, completed },
  });
  res.json(updatedTodo);
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(204);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
