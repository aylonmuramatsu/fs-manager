import { UserSession } from 'src/types/user-session';
import { User } from 'src/model/user.model';

export default function getSession(user: User) {
  let session: UserSession = {
    id: user.id,
    name: user.name,
  };

  return session;
}
