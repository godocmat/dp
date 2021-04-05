import {User} from '../../auth/models/user';

export interface Room {
  users: Array<User>;
  roomType: string;
}
