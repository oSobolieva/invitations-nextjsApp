'use server'
import { MongoClient } from 'mongodb';

export async function addFriend(userEmail, friendInformation) {
    const client = await MongoClient.connect('mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/');
    try {
        const db = client.db('HenryWallen');
        
        await db.collection('users').updateOne(
            { email: userEmail },
            { $push: { friends: friendInformation } }
        );
    } catch (error) {
        console.error('Error saving new friend to MongoDB:', error);
    } finally {
        await client.close();
    }
}

export async function deleteFriend(userEmail, friendEmail) {
     const client = await MongoClient.connect('mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/');
    try {
        const db = client.db('HenryWallen');
        
        await db.collection('users').updateOne(
            { email: userEmail },
            { $pull: { friends: { email: friendEmail } } }
        );
    } catch (error) {
        console.error('Error deleting friend from MongoDB:', error);
    } finally {
        await client.close();
    }
}