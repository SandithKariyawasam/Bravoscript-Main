const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Define the route (Note: we just use '/' here, see Step 2 for why)
router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    try {
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
        res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email', error });
    }
});

// Export the router so index.js can use it
module.exports = router;