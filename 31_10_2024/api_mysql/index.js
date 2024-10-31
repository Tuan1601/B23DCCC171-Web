const express = require('express');
const app = express();
const todosRouter = require('./src/routes/todosRoutes');

app.use(express.json());

app.use('/todos', todosRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3001');
});