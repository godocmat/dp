export class User {
  uid: string;
  email: string;
  roles: {
    client: boolean;
    admin?: boolean;
  };
  firstName: string;
  lastName: string;
  room: string;
  payment: boolean
}
