const express = require('express');
const router = express.Router();
const { db, auth } = require('../firebase');
const protectRoute = require('../middleware/authMiddleware');

router.post('/login', async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).send({ error: 'No token provided' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        const userRef = db.collection('users').doc(uid);
        const doc = await userRef.get();

        let userRole = 'user';

        if (!doc.exists) {

            if (email === 'sandithkariyawasam2001@gmail.com') {
                userRole = 'admin';
            }

            await userRef.set({
                email: email,
                name: name || 'User',
                picture: picture || '',
                role: userRole,
                createdAt: new Date().toISOString()
            });
            console.log(`New user created: ${email} as ${userRole}`);
        } else {
            const userData = doc.data();
            userRole = userData.role || 'user';
        }

        res.status(200).json({
            message: 'Login successful',
            role: userRole,
            uid: uid
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(401).send({ error: 'Invalid token or login failed' });
    }
});

router.get('/', (req, res) => {
    res.status(200).send({ message: 'Auth routes module loaded.' });
});

router.get('/protected', protectRoute, (req, res) => {
    res.status(200).send({
        message: 'Access granted! Token is valid.',
        user: {
            uid: req.user.uid,
            email: req.user.email,
        }
    });
});

router.get('/users', protectRoute, async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();

        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).send({ data: users });

    } catch (error) {
        console.error('Firestore Error:', error);
        res.status(500).send({ error: 'Failed to retrieve data.' });
    }
});

module.exports = router;