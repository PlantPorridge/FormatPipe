import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { FormatPipe } from './pipes/format.pipe';
import { DecimalPipe, PercentPipe, DatePipe, CurrencyPipe, CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    FormatPipe    
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-GB" },
    DecimalPipe,
    PercentPipe, 
    DatePipe, 
    CurrencyPipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
