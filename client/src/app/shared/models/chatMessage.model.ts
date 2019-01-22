/** represent chat message class */
export class ChatMessage {

  user: string;
  message: string;
  group: string;
  sent: Date;

  constructor(user: string = '', message: string = '', group: string = '', date: string = '') {
    this.user = user;
    this.message = message;
    this.group = group;
    this.sent = new Date(date);
  }
}
