import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sobolieva364:sobolieva364@learndb.qltkemg.mongodb.net/';
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db('HenryWallen');
}
