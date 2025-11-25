
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
}

module.exports = SnippetModel;