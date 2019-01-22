import { Component } from '@angular/core';
import { SignalRService } from '../../../core/services/signalR.service';
import { ChatMessage } from '../../../shared/models/chatMessage.model';

@Component({
    selector: 'app-chat-component',
    templateUrl: 'chat.component.html'
})
export class ChatComponent {
    currentMessage: ChatMessage = new ChatMessage();
    allMessages: ChatMessage[] = [];
    canSendMessage: boolean;

    constructor(private signalRService: SignalRService) {
        this.subscribeToEvents();
    }

    sendMessage() {
        if (this.canSendMessage) {
            this.currentMessage.sent = new Date().toString();
            this.signalRService.sendChatMessage(this.currentMessage);
        }
    }

    private subscribeToEvents(): void {
        this.signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });
    }
}
