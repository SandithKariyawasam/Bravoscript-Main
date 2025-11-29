
const express = require('express');
const router = express.Router(); 
const { db } = require('../firebase'); 
const protectRoute = require('../middleware/authMiddleware'); 


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