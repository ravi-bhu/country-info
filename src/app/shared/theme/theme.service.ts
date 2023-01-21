import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(true);

  get isDarkMode$() {
    return this.isDarkModeSubject.asObservable();
  }

  toggleTheme() {
    this.isDarkModeSubject.next(!this.isDarkModeSubject.value);
    document.body.classList.toggle('dark-mode');
  }
}
