import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { SettingsService } from './modules/settings/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private settingsService: SettingsService) {
  // Initialize settings when the app loads
  this.settingsService.loadSettings();
  }
}
