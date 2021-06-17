export interface AuthInterface {
  authenticated: boolean;
  guest: boolean;
}

export interface AuthUserInterface {
  uid?: string;
  displayName?: string;
  email: string;
  password?: string;
  photoURL?: string;
  emailVerified?: false;
}

