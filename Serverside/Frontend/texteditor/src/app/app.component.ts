import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, merge, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ServersideService } from './services/statemanagement/serverside.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'texteditor';
  textState = new BehaviorSubject('');
  nextEnabled = new BehaviorSubject(false);
  constructor(private stateManagement: ServersideService) {
    this.stateManagement.getLastStep().subscribe((element) => {
      this.updateState(element);
    })
  }

  private updateState(element: { text: string; nextStep: boolean }) {
    this.textState.next(element.text);
    this.nextEnabled.next(element.nextStep);
  }

  undoStep() {
    this.stateManagement.stepBackHistory().subscribe((element) => {
      this.updateState(element);
    });
  }

  addHistory(change: any) {
    this.stateManagement.addHistory(change).subscribe((element) => {
      this.updateState(element);
    });;
  }

  redoStep() {
    this.nextEnabled
      .pipe(
        take(1),
        filter((value) => value),
        switchMap(() => 
          this.stateManagement.stepForwardHistory())
      )
      .subscribe((element) => {
        this.updateState(element);
      });
  }
}
