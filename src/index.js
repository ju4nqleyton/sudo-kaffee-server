import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MONGODB ON');
  })
  .catch((error) => console.error(error));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ON in port: ${PORT}`);
});
