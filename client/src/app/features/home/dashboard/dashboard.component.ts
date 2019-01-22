import { Component } from '@angular/core';
import { SignalRService } from '../../../core/services/signalR.service';
import { Group } from '../../../shared/models/group.model';
import { ChatMessage } from '../../../shared/models/chatMessage.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    currentGroup: Group = new Group();
    allMessages: ChatMessage[] = [];
    canSendMessage: boolean;
    groups: Group[] = [];

    constructor(private signalRService: SignalRService) {
        this.subscribeToEvents();
    }

    addToGroup() {
        if (this.canSendMessage) {
            this.groups.push(this.currentGroup);
            this.signalRService.addToGroup(this.currentGroup);
        }
    }

    removeToGroup(group: Group) {
        if (this.canSendMessage) {
            const index = this.groups.indexOf(group);
            this.groups.slice(index, 1);
            this.signalRService.removeToGroup(group);
        }
    }

    private subscribeToEvents(): void {
        this.signalRService.connectionEstablished.subscribe(() => {
            this.canSendMessage = true;
        });

        this.signalRService.messageReceived.subscribe((message: ChatMessage) => {
            this.allMessages.push(
                new ChatMessage(message.message, message.sent.toString())
            );
        });
    }
}
