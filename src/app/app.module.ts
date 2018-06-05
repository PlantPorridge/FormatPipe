import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { FormatPipeModule } from 'ng-format-pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormatPipeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-GB" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
