import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; 
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch,withInterceptorsFromDi } from '@angular/common/http';  // Import the necessary HTTP providers

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { orderReducer } from './store/order.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // Add this line to enable fetch API
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({orderReducer: orderReducer}) // Register the orderReducer with the store
]
};
