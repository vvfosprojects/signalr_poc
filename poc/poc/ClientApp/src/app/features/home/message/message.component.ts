import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../../shared/models/chatMessage.model';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent {

    @Input() message: ChatMessage;

}
