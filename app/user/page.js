import { GET } from '../api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth';
import UserPage from "../components/UserPage"

import { getUserByEmail} from '../lib/getUser';

export default async function Page() {
  const session = await getServerSession(GET);
  const USER_DATA = await getUserByEmail(session.user.email);

  return <UserPage user={USER_DATA}/>
}
