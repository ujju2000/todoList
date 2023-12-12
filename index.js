const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended : true}));
let todos = [];
app.get('/todos' , (req,res) => {
   res.json(todos);
})

app.post('/todos' , (req,res) => {
    const {todo} = req.body;
    const newTodo = {id : todos.length +1 , todo};
    todos.push(newTodo);
    res.json(newTodo);
})

app.delete('/delete/:id' , (req,res) => {
    const id = req.params.id;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    res.json({message : 'Todo deleted successfully'});
})

app.listen(3000, () => console.log('server started'));