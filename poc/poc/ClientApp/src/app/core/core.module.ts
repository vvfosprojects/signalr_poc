import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SignalRService } from './services/signalR.service';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: []
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                SignalRService
            ]
        };
    }
}
