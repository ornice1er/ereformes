import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribingElementService {
  title = new BehaviorSubject<string>('');

  constructor() { }

  getTitle() : Observable<string> {
    return this.title.asObservable();
   }
}
