import { Injectable } from '@angular/core';
import { cookieTypes, Language, Themes } from '../settings/cookieTypes';

@Injectable({
  providedIn: 'root',
})
export class CookieServiceService {
  getSettings(): cookieTypes {
    return this.readCookies();
  }

  setSettings(language: Language, theme: Themes, fontSize: number) {
    document.cookie = `language=${language}`;
    document.cookie = `theme=${theme}`;
    document.cookie = `fontSize=${fontSize}`;
  }

  readCookies(): cookieTypes{
    let userSettings: cookieTypes = {
      language: Language.de,
      theme: Themes.light,
      fontSize: 12,
    };
    var allcookies = document.cookie;
    let cookiearray = allcookies.split(';');
    cookiearray.forEach((cookie) => {
      let name = cookie.split('=')[0].trim();
      if (Object.keys(userSettings).includes(name)) {
        userSettings[name] = cookie.split('=')[1].trim();
      }
    });
    return userSettings;
  }
}
