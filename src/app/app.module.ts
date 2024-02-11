import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FunctionalTableComponent } from './functional-table/functional-table.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FakeBackend } from './services/fake-backend';
import { FormsModule } from '@angular/forms';
import { FakeBackendInterceptor } from './services/fake-backend.interceptor';

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
    provideHttpClient(),
    provideClientHydration(),
    FakeBackend,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:FakeBackendInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
