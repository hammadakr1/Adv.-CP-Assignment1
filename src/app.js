const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./modules/auth/auth.routes');
const categoryRoutes = require('./modules/category/category.routes');
const courseRoutes = require('./modules/course/course.routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Course API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
