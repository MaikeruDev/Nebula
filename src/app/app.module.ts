import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, iosTransitionAnimation } from '@ionic/angular';
 
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { ServiceWorkerModule } from '@angular/service-worker';
import { DebounceClickFollowSuggestionDirective } from './directive/debounce-click-follow-suggestion.directive'; 

@NgModule({
  declarations: [AppComponent, DebounceClickFollowSuggestionDirective],
  imports: [BrowserModule, IonicModule.forRoot({mode: "md", navAnimation: iosTransitionAnimation, swipeBackEnabled: false}), AppRoutingModule, HttpClientModule, ReactiveFormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}