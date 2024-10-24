const express = require("express");
const app = express();
const port = 3000;

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: "John Hoan" },
        { id: 2, name: "Jane Gio Tai" }
    ]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
