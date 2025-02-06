import express from 'express';
import Routes from './routes/index.js';
import './database/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Routes(app);

export default app;
