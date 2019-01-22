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

    private static getCopy(value): any {
        return (JSON.parse(JSON.stringify(value)));
    }

    addToGroup() {
        if (this.canSendMessage) {
            const current = DashboardComponent.getCopy(this.currentGroup);
            this.groups.push(current);
            this.signalRService.addToGroup(current);
        }
    }

    removeToGroup(group: Group) {
        if (this.canSendMessage) {
            const index = this.groups.indexOf(group);
            if (index > -1) {
                this.groups.splice(index, 1);
            }
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
