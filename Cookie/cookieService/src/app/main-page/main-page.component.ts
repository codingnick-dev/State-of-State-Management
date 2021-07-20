import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieServiceService } from '../services/cookie-service.service';
import { cookieTypes, Language, Themes } from '../settings/cookieTypes';
import { values } from '../settings/values';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  values = values;
  settings: BehaviorSubject<cookieTypes> = new BehaviorSubject({
    fontSize: 12,
    language: Language.de,
    theme: Themes.light,
  });
  Themes = Themes;
  settingsOpen = false;
  constructor(private cookieService: CookieServiceService) {
    this.settings.next(this.cookieService.getSettings());
  }

  ngOnInit(): void {}

  openSettings() {
    this.settingsOpen = true;
  }

  updateSettings(){
    this.settings.next(this.cookieService.getSettings());
  }

  closeSettings() {
    this.settingsOpen = false;
  }
}
