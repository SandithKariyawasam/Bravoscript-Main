
const db = require('../firebase'); // Import your existing firebase connection

const collectionName = 'code_snippets';

class SnippetModel {

    // Create or Update a snippet
    static async createSnippet(data) {
        // If an ID is provided, use it as the document ID. 
        // Otherwise, Firestore generates a random one.
        if (data.id) {
            await db.collection(collectionName).doc(data.id).set(data);
            return data.id;
        } else {
            const res = await db.collection(collectionName).add(data);
            return res.id;
        }
    }

    // Get a snippet by ID
    static async getSnippetById(id) {
        const doc = await db.collection(collectionName).doc(id).get();
        if (!doc.exists) {
            return null;
        }
        return { id: doc.id, ...doc.data() };
    }

    static async getLatestSnippets() {
        try {
            const snapshot = await db.collection('code_snippets')
                .orderBy('createdAt', 'desc') // Sort by newest date
                .limit(24)                     // Get only 6
                .get();

            // Convert Firestore docs to simple JSON array
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SnippetModel;