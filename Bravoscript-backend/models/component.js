
const { db } = require('../firebase');

const collectionName = 'code_snippets';

class SnippetModel {

    static async createSnippet(data) {
        if (data.id) {
            await db.collection(collectionName).doc(data.id).set(data);
            return data.id;
        } else {
            const res = await db.collection(collectionName).add(data);
            return res.id;
        }
    }

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
                .orderBy('createdAt', 'desc')
                .get();

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SnippetModel;