import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ChatMessage } from '../../shared/models/chatMessage.model';
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

    sendChatMessage(message: ChatMessage, nick: string, room: string) {
        this.hubConnection.invoke('SendMessage', room, nick, message);
    }

    removeToGroup(message: ChatMessage) {
        this.hubConnection.invoke('AddToGroup', message);
    }

    addToGroup(message: ChatMessage) {
        this.hubConnection.invoke('RemoveToGroup', message);
    }

    private createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(CONFIGURATION.baseUrls.server)
            .build();
    }

    private startConnection() {
        this.hubConnection.start().then(() => {
            console.log('Hub connection started');
            this.connectionEstablished.next(true);
        });
    }

    private registerOnServerEvents(): void {
        this.hubConnection.on('Send', (data: any) => {
            this.messageReceived.next(data);
        });
    }
}
