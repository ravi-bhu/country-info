import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../shared/theme/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
      <h3>Where in the world?</h3>
      <span>
        <button class="toggle" (click)="toggleTheme()">
          <span
            [ngClass]="[
              'icon',
              (this.isDarkMode$ | async) ? 'icon-light-mode' : 'icon-dark-mode'
            ]"
          ></span>
        </button>
      </span>
    </header>
  `,
  styles: [
    `
      header {
        background-color: var(--clr-primary);
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-inline: 4rem;
      }

      h3 {
        margin: 0;
      }

      .toggle {
        border: none;
        text-decoration: none;
        background-color: inherit;
        color: var(--clr-text);
        cursor: pointer;
      }

      img {
        color: var(--clr-text);
      }

      .icon-dark-mode {
        mask: url('../../assets/icons/dark-mode.svg');
        transition: all 0.2s;
      }

      .icon-light-mode {
        mask: url('../../assets/icons/light-mode.svg');
        transition: all 0.2s;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  isDarkMode$ = this.themeService.isDarkMode$;
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
