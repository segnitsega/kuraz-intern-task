const express = require('express');

const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
