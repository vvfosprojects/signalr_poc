import { Component, NgZone } from '@angular/core';
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

    constructor(private signalRService: SignalRService,
                private ngZone: NgZone) {
        this.subscribeToEvents();
    }

    addToGroup() {
        if (this.canSendMessage) {
            const newGroup: Group = new Group(this.currentGroup.id);
            const result = this.groups.filter(p => p.id === newGroup.id);
            if (result.length === 0 || this.groups.length === 0) {
                this.groups.push(newGroup);
                this.signalRService.addToGroup(newGroup);
            }
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
            this.ngZone.run(() => {
                this.allMessages.push(
                    new ChatMessage(message.message, message.group, message.sent)
                );
            });
        });
    }
}
