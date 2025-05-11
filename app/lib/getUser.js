import { getDb } from './linkDB';

export async function getUserByEmail(email) {
  const db = await getDb();
  const users = db.collection('users');
  const result = await users.findOne({ email });
  return result;
}

export async function getUserFriends(email) {
  const db = await getDb();
  const users = db.collection('users');

  const user = await users.findOne({ email }, { projection: { friends: 1, _id: 0 } });
  if (!user || !user.friends || !Array.isArray(user.friends)) return [];

  const friends = user?.friends || [];

  return friends;
}
