import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './container/components/home/home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        IonicModule,
    ]
})
export class HomeModule { }
