import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'app_settings';

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeSettings();
  }

  private initializeSettings(): void {
    const settings = this.loadSettings();
    if (settings.language) {
      this.translateService.use(settings.language); // Apply saved language
    }
  }

  loadSettings(): { language: string; dateFormat: string } {
    let settings = { language: 'en', dateFormat: 'YYYY/MM/DD' }; // Default settings
    if (isPlatformBrowser(this.platformId)) {
      const storedSettings = sessionStorage.getItem(this.SETTINGS_KEY);
      if (storedSettings) {
        settings = { ...settings, ...JSON.parse(storedSettings) };
      }
    }
    return settings;
  }

  saveSettings(settings: Partial<{ language: string; dateFormat: string }>): void {
    if (isPlatformBrowser(this.platformId)) {
      const existingSettings = sessionStorage.getItem(this.SETTINGS_KEY)
        ? JSON.parse(sessionStorage.getItem(this.SETTINGS_KEY)!)
        : {};
      const updatedSettings = { ...existingSettings, ...settings };
      sessionStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updatedSettings));
    }
    if (settings.language) {
      this.translateService.use(settings.language); // Apply updated language
    }
  }
}
