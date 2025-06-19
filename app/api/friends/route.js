import { addFriend, deleteFriend } from '../../lib/friendsService';
import { getUserFriends } from '../../lib/getUser';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const friends = await getUserFriends(email);
  return Response.json(friends);
}

export async function POST(req) {
  const { userEmail, friendInformation } = await req.json();
  await addFriend(userEmail, friendInformation);
  return Response.json({ success: true });
}

export async function DELETE(req) {
  const { userEmail, friendsEmailtoRemove } = await req.json();
  await deleteFriend(userEmail, friendsEmailtoRemove);
  return Response.json({ success: true });
}
