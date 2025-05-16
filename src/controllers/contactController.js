import Contact from '../models/Contact.js';

export async function saveContact(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'empty fields' });
    }
    const contact = new Contact({ name, email });
    await contact.save();
    console.log('contact saved:', contact);
    res.status(200).json({ message: 'contact saved successfully' });
  } catch (error) {
    console.error('error saving contact:', error);
    res.status(500).json({ error });
  }
}
