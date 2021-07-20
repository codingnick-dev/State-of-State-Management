import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieServiceService } from '../services/cookie-service.service';
import { cookieTypes, Themes } from '../settings/cookieTypes';
import { filter, take } from 'rxjs/operators';
import { values } from '../settings/values';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent implements AfterViewInit {
  @Output() closeSetting = new EventEmitter();
  @Output() settingsChange = new EventEmitter();
  @Input() settings: Observable<cookieTypes>;
  langauges = Object.keys(values.language);
  themes = Object.keys(Themes);
  // To Block Iteration Loops by setting and getting the State
  updateBlock = true;
  formGroup = new FormGroup({
    language: new FormControl(''),
    theme: new FormControl(''),
    fontSize: new FormControl(''),
  });
  constructor(private cookieService: CookieServiceService) {
  }

  ngAfterViewInit(): void {
    this.settings.subscribe((value: cookieTypes) => {
      this.formGroup.patchValue(
        {
          language: value.language,
          theme: value.theme,
          fontSize: value.fontSize,
        },
        { emitEvent: false }
      );
    });
    this.formGroup.valueChanges.subscribe(() => {
      let values = {
        language: this.formGroup.get('language').value,
        theme: this.formGroup.get('theme').value,
        fontSize: this.formGroup.get('fontSize').value,
      };
      this.cookieService.setSettings(
        values.language,
        values.theme,
        values.fontSize
      );
      this.settingsChange.emit();
    });
  }

  closeMenu() {
    this.closeSetting.emit();
  }
}
