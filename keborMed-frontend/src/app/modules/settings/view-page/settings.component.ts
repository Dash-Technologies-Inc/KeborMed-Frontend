import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentSettings: { language: string; dateFormat: string } = {
    language: 'en',
    dateFormat: 'YYYY/MM/DD',
  };

  dateFormats: string[] = ['YYYY/MM/DD', 'DD/MM/YYYY', 'MM-DD-YYYY'];
  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español (Spanish)' },
    { value: 'it', label: 'Italiano (Italian)' },
    { value: 'tr', label: 'Türkçe (Turkish)' },
    { value: 'ja', label: '日本語 (Japanese)' }
  ];
  

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.currentSettings = this.settingsService.loadSettings();
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.settingsService.saveSettings({ language: target.value });
    this.currentSettings.language = target.value;
  }

  onDateFormatChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.settingsService.saveSettings({ dateFormat: target.value });
    this.currentSettings.dateFormat = target.value;
  }
}
