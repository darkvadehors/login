import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './features/login/container/components/alert/alert.component';
import { RegisterComponent } from './features/login/container/components/register/register.component';
import { JwtInterceptor } from './features/login/container/interceptor/jwt/jwt.interceptor';
import { ErrorInterceptor } from './features/login/container/interceptor/error/error.interceptor';
import { fakeBackendProvider } from './features/login/container/services/backEndTest/back-endtest';
import { LoginModule } from './features/login/login.modules';
import { HomeModule } from './features/home/home.modules';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HomeModule
  ],
  providers: [
    FormBuilder,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
