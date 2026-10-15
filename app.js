require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối database
connectDB();

// Middleware đọc JSON
app.use(express.json());

// Routes
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
