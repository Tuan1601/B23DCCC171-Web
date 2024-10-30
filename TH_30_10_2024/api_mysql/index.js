const express = require('express');
const app = express();
const todosRouter = require('./src/routers/todos');
const todos1Router = require('./src/routers/todos1');

app.use(express.json());

app.use('/todos', todosRouter);
app.use('/todos1', todos1Router);

app.listen(3002, () => {
    console.log('Server is running on port 3001');
});