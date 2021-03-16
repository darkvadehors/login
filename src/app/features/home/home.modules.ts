import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './container/components/home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
    ]
})
export class HomeModule { }
