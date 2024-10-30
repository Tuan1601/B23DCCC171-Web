const express = require('express');
const app = express();
const port = 3000;


app.get('/users', (req, res)=> {
    res.json([
        {id: 1, name: 'john wick'},
        {id: 2, name: 'Nguyen Anh Tuan'},
    ]);
});


app.post('/users', (req, res) =>{
    const newUser = req.body;
    res.status(201).json({message: `nguoi dung da duoc tao`, user: newUser});
});


app.put('/users/:id', (req, res) =>{
    const userId = req .params.id;
    const updateData = req.body;
    res.json({ message: `nguoi dung co id: ${userId} da duoc cap nhat`, updateData});
});


app.delete('/users/:id', (req, res) =>{
    const userId = req.params.id;
    res.json({message: `nguoi dung co id: ${userId} da duoc Xoa`});
});






app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});