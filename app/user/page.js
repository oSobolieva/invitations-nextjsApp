import { GET } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth';
import UserPage from "../components/UserPage"

import '../styles/userPage.css'

import { MongoClient } from 'mongodb';

async function getUsers(user) {
    const client = await MongoClient.connect('mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/');
    const db = client.db('HenryWallen');

    const usersCollection = db.collection('users');
    const result = await usersCollection.find({email: user}).toArray();

    client.close();

    return result;
}

export default async function Page() {
  const session = await getServerSession(GET);
  const USER_INFORMATION = await getUsers(session.user.email);

  return <UserPage user={USER_INFORMATION[0]} />
}
