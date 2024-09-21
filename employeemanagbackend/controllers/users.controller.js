const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const { ObjectId } = require('mongodb');
const client = new MongoClient(url);

const dbName = 'employemanage';

async function getUsers(req, res) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('user');
        const users = await collection.find().toArray();
        console.log(users);
        res.json(users); // Return the users data
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    } finally {
        await client.close();
    }
}

async function insertUsers(req, res) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('user');
        
        let users = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'employee1', password: 'emp1234567', role: 'employee' }
        ];

        const result = await collection.insertMany(users);
        console.log("Result:", JSON.stringify(result));
        res.json(result); // Return the result of insert operation
    } catch (error) {
        console.error('Error inserting users:', error);
        res.status(500).json({ error: 'Failed to insert users' });
    } finally {
        await client.close();
    }
}

module.exports = { getUsers, insertUsers };
