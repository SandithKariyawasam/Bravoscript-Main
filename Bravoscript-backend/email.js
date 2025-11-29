const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const { db } = require('../firebase');

router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await db.collection('contacts').add({
            name: name,
            email: email,
            message: message,
            submittedAt: new Date().toISOString()
        });
        console.log("Data saved to Firestore");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Data saved and email sent!' });

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: 'Something went wrong', error: error.toString() });
    }
});

module.exports = router;