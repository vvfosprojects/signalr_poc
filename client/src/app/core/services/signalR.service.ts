import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ChatMessage } from '../../shared/models/chatMessage.model';
import { Group } from '../../shared/models/group.model';
import { CONFIGURATION } from '../../shared/app.constants';


@Injectable()
export class SignalRService {
    messageReceived = new Subject<ChatMessage>();
    connectionEstablished = new Subject<Boolean>();
    private hubConnection: HubConnection;


    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendChatMessage(message: ChatMessage) {
        this.hubConnection.invoke('SendMessage', message);
    }

    removeToGroup(group: Group) {
        this.hubConnection.invoke('AddToGroup', group.id.toString());
    }

    addToGroup(group: Group) {
        this.hubConnection.invoke('RemoveToGroup', group.id.toString());
    }

    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(CONFIGURATION.baseUrls)
            .build();
    }

    private startConnection() {
        this.hubConnection.start().then(() => {
            console.log('Hub connection started');
            this.connectionEstablished.next(true);
        }).catch(err => {
            console.log('Error while establishing connection, retrying...');
            setTimeout(() => this.startConnection(), 5000);
        });
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('ReceiveMessage', (data: any) => {
            this.messageReceived.next(data);
        });
    }
}
