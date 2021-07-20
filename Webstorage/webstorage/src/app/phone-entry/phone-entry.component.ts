import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhoneBookEntry } from '../model/PhoneBookEntry.model';
import { LocalStorageService } from '../services/localStorage/local-storage.service';

@Component({
  selector: 'app-phone-entry',
  templateUrl: './phone-entry.component.html',
  styleUrls: ['./phone-entry.component.scss'],
})
export class PhoneEntryComponent implements OnInit {
  @Output() removeEntry: EventEmitter<number> = new EventEmitter<number>();
  @Input() phoneEntry: PhoneBookEntry;

  constructor() {}

  ngOnInit(): void {}

  deleteEntry() {
    this.removeEntry.emit(this.phoneEntry.id);
  }
}
