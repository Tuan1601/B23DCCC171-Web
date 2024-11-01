const express = require('express');
const app = express();
const todosRouter = require('./src/routes/todosRoutes');
const usersRouter = require('./src/routes/usersRoutes');

app.use(express.json());

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000'); 
});
