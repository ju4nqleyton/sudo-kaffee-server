import Contact from '../models/Contact.js';
import { sendEmail } from '../utils.js';

export async function saveContact(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'empty fields' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('-contact saved:\n', contact);
    await sendEmail({ name, email, message });
    res.status(200).json({ message: 'contact saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
