export interface UserType {
  user_id: number;
  name: string;
  email: string;
}

export interface AuthResponseType {
  user: UserType;
  access_token: string;
}

export interface signUpUser {
  user_id: number;
  name: string;
  email: string;
  displayname: string | null;
  profileImageUrl: string | null;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  created_at: string;
  identity_verification: boolean;
  image_url: string | null;
  password: string;
  prefecture: string | null;
  updated_at: string;
  zip_code: string | null;
}
