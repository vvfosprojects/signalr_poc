/** represent chat message class */
export class ChatMessage {

  user: string;
  message: string;
  room: string;
  sent: Date;

  constructor(user: string = '', message: string = '', room: string = '', date: string = '') {
    this.user = user;
    this.message = message;
    this.room = room;
    this.sent = new Date(date);
  }
}
