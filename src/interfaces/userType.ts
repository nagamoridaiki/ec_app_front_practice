export interface UserType {
  user_id: number;
  name: string;
  email: string;
}

export interface AuthResponseType {
  user: UserType;
  access_token: string;
}
