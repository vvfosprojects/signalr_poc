import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { ChatComponent } from './features/home/chat/chat.component';

const appRoutes: Routes = [
    {path: 'master', component: ChatComponent},
    {path: 'client', component: DashboardComponent},
    {path: '', pathMatch: 'full', redirectTo: 'master'},
];

export const appRouting = RouterModule.forRoot(appRoutes);
