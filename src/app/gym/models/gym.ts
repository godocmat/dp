import {User} from '../../auth/models/user';

export class Gym {
  public uid: string;
  public date: string;
  public timeFrom: string;
  public timeUntil: string;
  public status: string;
  public gymNumber: number;
  public user: User;
}
