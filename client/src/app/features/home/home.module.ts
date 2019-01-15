import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [],
    declarations: [
        ChatComponent,
        DashboardComponent,
    ],
    providers: []
})
export class HomeModule {
}
