export interface UserInterface {
  uid?: string;
  displayName: string;
  email: string;
  password?: string;
  photoURL: string;
  emailVerified: boolean;
  isPremium: boolean;
  profile: UserProfileInterface;
}

export interface UsersInterface {
  [key: string]: UserInterface
}

export interface UserProfileInterface {
  [key: string]: string,
}
