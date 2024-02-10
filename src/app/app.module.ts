import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalTableComponent } from './functional-table/functional-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FakeBackend } from './services/fake-backend';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FunctionalTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    FakeBackend
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
