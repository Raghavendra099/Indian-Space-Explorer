const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    const contact = await Contact.create({ name, email: email.toLowerCase(), subject, message });
    res.status(201).json({ success: true, message: 'Your message has been received.', data: contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to submit contact form.' });
  }
};
