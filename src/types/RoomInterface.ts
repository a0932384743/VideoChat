export interface RoomInterface {
  id?: string;
  activeCandidatesCount: number;
  createdAt?: any;
  isPublic: boolean;
  status: string;
  userIds: Array<string>;
}
