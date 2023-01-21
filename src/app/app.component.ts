import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        height: 100vh;
        background-color: var(--clr-primary);
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, ToolbarComponent, RouterOutlet],
})
export class AppComponent {}
