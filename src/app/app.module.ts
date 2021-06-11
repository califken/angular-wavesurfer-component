import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WavesurferComponent } from './wavesurfer/wavesurfer.component';

@NgModule({
  declarations: [AppComponent, WavesurferComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
