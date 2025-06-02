'use server'
import { MongoClient } from 'mongodb';

const MONGO_URI = 'mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/';
const DB_NAME = 'HenryWallen';

export async function addEventToDB(event, email) {
    const client = await MongoClient.connect(MONGO_URI);
    try {
        const db = client.db(DB_NAME);
        await db.collection('users').updateOne(
            { email: email },
            { $push: { events: event }}
        );
    } catch (error) {
        console.error('Error saving event data to MongoDB:', error);
    } finally {
        await client.close();
    }
}

export async function updateEventInDB(eventId, updatedEvent, email) {
    const client = await MongoClient.connect(MONGO_URI);
    try {
        const db = client.db(DB_NAME);
        await db.collection('users').updateOne(
            { email: email, 'events._id': eventId },
            { $set: { 'events.$': updatedEvent } }
        );
    } catch (error) {
        console.error('Error saving event data to MongoDB:', error);
    } finally {
        await client.close();
    }
}

export async function deleteEventFromDB(eventId, email) {
    const client = await MongoClient.connect(MONGO_URI);
    try {
        const db = client.db(DB_NAME);
        await db.collection('users').updateOne(
            { email: email },
            { $pull: { events: { _id: eventId }} }
        );
    } catch (error) {
        console.error('Error deleting event from MongoDB:', error);
    } finally {
        await client.close();
    }
}