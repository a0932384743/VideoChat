import { UserInterface } from 'src/types/store/UserInterface';

export interface ChatMessageInterface {
  id?: string;
  roomId: string;
  userId: string;
  text: string;
  createdAt?: any;
  user?: UserInterface
}
