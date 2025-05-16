import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/contacts', contactRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('-connection mongodb successful');
  })
  .catch((error) => console.error(error));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`-server running in port ${PORT}`);
});
