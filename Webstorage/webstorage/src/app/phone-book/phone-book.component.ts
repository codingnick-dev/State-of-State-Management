import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Page, PhoneBookEntry } from '../model/PhoneBookEntry.model';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss'],
})
export class PhoneBookComponent {
  phoneName: FormControl = new FormControl('');
  phoneNumber: FormControl = new FormControl('');
  allNumbers: BehaviorSubject<PhoneBookEntry[]> = new BehaviorSubject<
    PhoneBookEntry[]
  >([]);
  pageColumns = 3;
  pageRows = 5;
  pages: Observable<Page[]>;

  stateShow: Observable<string>;

  constructor(private localStorageService: LocalStorageService) {
    this.allNumbers.next(this.localStorageService.loadData());
    this.stateShow = this.allNumbers.pipe(
      map((entries) => JSON.stringify(entries[0], null, '\t'))
    );
    this.pages = this.allNumbers.pipe(
      map((entries) => this.convertEntriesToPages(entries))
    );
    this.pages.subscribe(console.log);
  }

  getPageColumns() {
    return Array(this.pageColumns);
  }
  getPageRows() {
    return Array(this.pageRows);
  }

  convertEntriesToPages(entries: PhoneBookEntry[]) {
    let pages: Page[] = [];
    let allEntries = entries.sort((entryOne, entryTwo) =>
      entryOne.name.localeCompare(entryTwo.name)
    );
    let pageEntryCount = this.pageColumns * this.pageRows;
    for (let i = 0; i < allEntries.length; i++) {
      let currentEntry = allEntries[i];
      let page = Math.floor(i / pageEntryCount);
      let column = Math.floor((i - page * pageEntryCount) / this.pageRows);
      if (page > pages.length - 1) {
        pages.push({ columns: [] });
      }
      if (column > pages[page].columns.length - 1) {
        pages[page].columns.push([]);
      }
      pages[page].columns[column].push(currentEntry);
    }
    return pages;
  }

  addNumber() {
    let newNumber = {
      name: this.phoneName.value,
      number: this.phoneNumber.value,
    };
    let newValue: PhoneBookEntry[] =
      JSON.parse(JSON.stringify(this.localStorageService.loadData())) ?? [];
    let lastId = Math.max(...newValue.map((phoneEntry) => phoneEntry.id));
    let newEntry: PhoneBookEntry = { ...newNumber, id: ++lastId };
    newValue.push(newEntry);
    localStorage.setItem('phonenumbers', JSON.stringify(newValue));
    this.localStorageService.saveState(JSON.parse(JSON.stringify(newValue)));
    this.allNumbers.next(this.localStorageService.loadData());
  }

  removeEntry(id: number) {
    let newValue: PhoneBookEntry[] =
      JSON.parse(JSON.stringify(this.localStorageService.loadData())) ?? [];
    newValue = newValue.filter((value) => value.id !== id);
    localStorage.setItem('phonenumbers', JSON.stringify(newValue));
    this.localStorageService.saveState(newValue);
    this.allNumbers.next(this.localStorageService.loadData());
  }
}
