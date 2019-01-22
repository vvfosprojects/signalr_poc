/** represent chat message class */
export class ChatMessage {

  message: string;
  group: string;
  sent: string;

  constructor(message: string = '', group: string = '', date: string = '') {
    this.message = message;
    this.group = group;
    this.sent = date;
  }
}
