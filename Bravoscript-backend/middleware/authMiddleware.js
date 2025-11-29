
const { auth } = require('../firebase'); 

const protectRoute = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        console.log('Authorization header missing or malformed.');
        return res.status(401).send({ error: 'Unauthorized: No token provided or invalid format.' });
    }

    
    const idToken = header.split('Bearer ')[1];

    try {
        
        const decodedToken = await auth.verifyIdToken(idToken);
        
        
        req.user = decodedToken; 
        
        
        next();
    } catch (error) {
        
        console.error('Error verifying Firebase ID token:', error.message);
        return res.status(403).send({ error: 'Unauthorized: Invalid or expired token.' });
    }
};

module.exports = protectRoute;