import { Message } from "../modules/User";

export interface apiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Message[];
}