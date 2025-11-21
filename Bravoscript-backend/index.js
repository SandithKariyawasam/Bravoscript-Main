require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Allows React to connect

// Email Sending Route
app.post('/api/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1. Setup Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS 
            }
        });

        // 2. Setup Email Data
        const mailOptions = {
            from: email, // Sender address (from the form)
            to: process.env.EMAIL_USER, // Receiver (You)
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        // 3. Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email', error });
    }
});

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; // For Vercel