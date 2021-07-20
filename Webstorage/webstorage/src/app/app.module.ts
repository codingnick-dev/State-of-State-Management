import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneEntryComponent } from './phone-entry/phone-entry.component';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'; 

@NgModule({
  declarations: [AppComponent, PhoneEntryComponent, PhoneBookComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, NoopAnimationsModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
