import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { devTools } from '@ngneat/elf-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { enableElfProdMode } from '@ngneat/elf';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Factory function for HTTP loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })]),
    provideAnimationsAsync('noop')],
}).catch((err) => console.error(err));

// Enable Elf DevTools in development mode
if (isDevMode()) {
  devTools({
    name: 'Kebormed', // Give your application a name (optional)
    logTrace: true, // Logs stack traces for actions in the console
  });
} else {
  enableElfProdMode(); // Enable production mode for Elf
}

