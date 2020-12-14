export class User {
  uid: string;
  email: string;
  roles: {
    client: boolean;
    admin?: boolean;
  };

}
