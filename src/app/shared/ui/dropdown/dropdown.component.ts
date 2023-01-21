import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <select name="region" (change)="onDropdownSelect($event)">
      <option value="">Filter by Region</option>
      <option value="africa">Africa</option>
      <option value="americas">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  `,
  styles: [
    `
      select {
        background-color: var(--clr-primary);
        color: var(--clr-text);
        padding: 1rem;
        border: none;
      }

      option {
        border: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Output() regionFilter = new EventEmitter<string>();
  onDropdownSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.regionFilter.emit(input.value);
  }
}
