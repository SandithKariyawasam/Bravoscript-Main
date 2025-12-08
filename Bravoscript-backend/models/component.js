
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

    static async deleteSnippet(id) {
        try {
            const docRef = db.collection(collectionName).doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return false; 
            }

            await docRef.delete();
            return true; 
        } catch (error) {
            throw error;
        }
    }

    static async updateSnippet(id, data) {
        try {
            const docRef = db.collection(collectionName).doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                return false; 
            }

            await docRef.update(data);
            return true;
        } catch (error) {
            console.error("Error in updateSnippet model:", error);
            throw error;
        }
    }

    static async getSnippetsByUser(userId) {
        try {
            const snapshot = await db.collection(collectionName)
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc') 
                .get();

            if (snapshot.empty) {
                return [];
            }

            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error in getSnippetsByUser:", error);
            throw error;
        }
    }
}

module.exports = SnippetModel;