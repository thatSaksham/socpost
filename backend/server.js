const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authenticateUser = require('./routes/authMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0:27017/socpost').then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', authenticateUser, require('./routes/posts'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
