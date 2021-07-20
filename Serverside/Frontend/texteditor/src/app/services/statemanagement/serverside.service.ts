import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServersideService {
  username = 'nico';
  constructor(private httpClient: HttpClient) {}

  addHistory(text: string) {
    return this.httpClient.post<{ text: string; nextStep: boolean }>(
      'http://localhost:3000/userHistory/add/' + this.username,
      { text: text }
    );
  }
  stepBackHistory() {
    return this.httpClient.get<{ text: string; nextStep: boolean }>(
      'http://localhost:3000/userHistory/stepback/' + this.username
    );
  }

  stepForwardHistory() {
    return this.httpClient.get<{ text: string; nextStep: boolean }>(
      'http://localhost:3000/userHistory/stepforward/' + this.username
    );
  }

  getLastStep() {
    return this.httpClient.get<{ text: string; nextStep: boolean }>(
      'http://localhost:3000/userHistory/last/' + this.username
    );
  }
}
