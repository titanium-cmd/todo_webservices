require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.DB_URL, {
}).then(()=>{
  console.log('Database connected');
}).catch((e)=>console.log('db connection err', e.message));

//get all todos
app.get('/', async (req, res)=>{
  return res.status(200).json({
    message: 'Welcome to todo API webservcies',
  });
});

app.get('/todos', async (req, res)=>{
  const todos = await Todo.find({});
  if(todos){
    return res.status(200).json({
      status: true,
      message: 'Todos fetched',
      data: todos
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'Could not fetch data',
    })
  }
});

//get one todo
app.get('/todos/:id', async (req, res)=>{
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if(todo){
    return res.status(200).json({
      status: true,
      message: 'Todo fetched',
      data: todo
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'Could not fetch data',
    })
  }
});

//create a todo
app.post('/', async (req, res)=>{
  const todo = await Todo.create(req.body);
  
  if(todo){
    return res.status(200).json({
      status: true,
      message: 'Todo created',
      data: todo
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'Could not create new todo',
    })
  }
});

//del one todo
app.delete('/todos/:id', async (req, res)=>{
  const todo = await Todo.findByIdAndDelete(req.params._id);
  if(todo){
    return res.status(200).json({
      status: true,
      message: 'Todo deleted successfully',
      data: req.body
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'Could not delete todo',
    })
  }
});

//patch one todo
app.patch('/todos/:id', async (req, res)=>{
  const { status } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params._id, { status });
  if(todo){
    return res.status(200).json({
      status: true,
      message: 'Todo updated',
      data: []
    });
  }else{
    return res.status(400).json({
      status: false,
      message: 'Could not update todo',
    })
  }
});

app.listen(port, ()=>console.log(`App running on port ${port}`));