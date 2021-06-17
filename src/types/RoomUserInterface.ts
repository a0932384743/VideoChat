export interface RoomUserInterface {
  task: string;
  uid: string;
  createdAt?: any;
  updatedAt?: any;
  displayName?: string;
}

export interface RoomUsersInterface {
  [key: string]: RoomUserInterface
}
