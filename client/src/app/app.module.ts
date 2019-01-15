import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouting } from './app.routing';
import { CoreModule } from './core/core.module';
import { HomeModule } from './features/home/home.module';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        HomeModule,
        appRouting,
        FormsModule
    ],

    declarations: [AppComponent],

    bootstrap: [AppComponent]
})
export class AppModule {
}
