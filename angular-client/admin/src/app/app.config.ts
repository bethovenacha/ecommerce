import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { routes } from "./app.routes";
import { provideClientHydration, withEventReplay } from "@angular/platform-browser";
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { orderReducer } from "./store/order/order.reducer";
import { OrderEffect } from "./store/order/order.effect";

export const 
appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideStore({ orderState: orderReducer }), // 👈 key = "orderState"
    provideEffects([OrderEffect])
  ]
};
