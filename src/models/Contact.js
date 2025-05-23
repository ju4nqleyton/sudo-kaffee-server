import mongoose from 'mongoose';

const contact = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

export default mongoose.model('Contact', contact);
