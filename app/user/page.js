import { GET } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth';
import UserPage from "../components/UserPage"
import avatarRandomizer from '../components/helpers/avatarRandomizer';

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
  let userImage = USER_INFORMATION[0].image;

  if (userImage == '') {
    userImage = avatarRandomizer();
  }

  return <UserPage name={USER_INFORMATION[0].name} email={USER_INFORMATION[0].email} image={userImage} friends={USER_INFORMATION[0].friends} />
}
