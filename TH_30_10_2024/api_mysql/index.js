const express = require('express');
const app = express();
const todosRouter = require('./src/routers/todos');

app.use(express.json());

app.use('/todos', todosRouter);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
