import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { CoreModule } from './core/core.module';
import { ConfirmationComponent } from './custome/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    MydashboardComponent,
    ConfirmationComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    BrowserModule,
    CoreModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
