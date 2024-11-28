import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { devTools } from '@ngneat/elf-devtools';
import { isDevMode } from '@angular/core';
import { enableElfProdMode } from '@ngneat/elf';
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),provideHttpClient(), provideAnimationsAsync('noop')],
}).catch((err) => console.error(err));

// Enable Elf DevTools in development mode
if (isDevMode()) {
  devTools({
    name: 'My Angular App', // Give your application a name (optional)
    logTrace: true, // Logs stack traces for actions in the console
  });
} else {
  enableElfProdMode(); // Enable production mode for Elf
}

