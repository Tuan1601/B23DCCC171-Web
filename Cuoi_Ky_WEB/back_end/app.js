const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const documentRoutes = require('./routes/documentRoutes');
const approvalRoutes = require('./routes/approvalRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const corsOptions = {
  origin:['http://localhost:3001', 'http://localhost:3002'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};




const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
