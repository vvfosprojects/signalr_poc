import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: DashboardComponent}
];

export const appRouting = RouterModule.forRoot(appRoutes);
