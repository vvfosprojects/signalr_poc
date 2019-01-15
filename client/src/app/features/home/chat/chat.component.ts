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
            this.currentMessage.sent = new Date();
            this.signalRService.sendChatMessage(this.currentMessage, 'Pippo', '1');
        }
    }

    private subscribeToEvents(): void {
        this.signalRService.connectionEstablished.subscribe(() => {
            console.log('test');
            this.canSendMessage = true;
        });

        this.signalRService.messageReceived.subscribe((message: ChatMessage) => {
            this.currentMessage = new ChatMessage();
            this.allMessages.push(
                new ChatMessage(message.message, message.sent.toString())
            );
        });
    }
}