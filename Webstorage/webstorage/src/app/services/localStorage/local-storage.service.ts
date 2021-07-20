import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PhoneBookEntry } from 'src/app/model/PhoneBookEntry.model';
import { PhoneBookComponent } from 'src/app/phone-book/phone-book.component';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  loadData(): PhoneBookEntry[] {
    return JSON.parse(localStorage.getItem('phonenumbers')) ?? [];
  }

  saveState(entries: PhoneBookEntry[]) {
    localStorage.setItem('phonenumbers', JSON.stringify(entries));
  }
}
