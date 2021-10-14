const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./schemas/todo_schema');

const app = express();
const port = 4000;

app.use(express.json());

mongoose.connect('mongodb://localhost/todos_db', {
}).then(()=>{
  console.log('Database connected');
});

//get all todos
app.get('/todos', async (req, res)=>{
  const todos = await TodoModel.find({});
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
  const todo = await TodoModel.findById(id);
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
  const todo = TodoModel.create(req.body);
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
app.delete('/todos/:id', (req, res)=>{
  const todo = TodoModel.findByIdAndDelete(req.params._id);
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
app.patch('/todos/:id', (req, res)=>{
  const { status } = req.body;
  const todo = TodoModel.findByIdAndUpdate(req.params._id, { status });
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