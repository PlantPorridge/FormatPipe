import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { FormatPipe } from './pipes/format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormatPipe    
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-GB" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
