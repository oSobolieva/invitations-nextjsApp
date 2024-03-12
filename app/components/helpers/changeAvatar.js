'use server'
import { MongoClient } from 'mongodb';

export default async function addNewAvatar(img, email) {
    const client = await MongoClient.connect('mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/');
    try {
        const db = client.db('HenryWallen');
        
        await db.collection('users').updateOne(
        { email: email },
        { $set: { image: img }});
    } catch (error) {
        console.error('Error saving image data to MongoDB:', error);
    } finally {
        await client.close();
    }
}





