'use server'
/**
 * Додає новий аватар користувача в базу даних MongoDB.
 * 
 * @async
 * @function addNewAvatar
 * @param {string} img - URL або дані зображення для аватара.
 * @param {string} email - Електронна адреса користувача.
 * @returns {Promise<void>} Проміс без поверненого значення.
 */
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





