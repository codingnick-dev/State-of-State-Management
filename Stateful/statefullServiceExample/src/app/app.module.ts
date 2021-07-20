import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressInputComponent } from './address-input/address-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';

@NgModule({
  declarations: [AppComponent, AddressInputComponent, DeliveryAddressComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
