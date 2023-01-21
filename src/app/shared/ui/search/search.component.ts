import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<input
    type="text"
    (keyup)="onChange($event)"
    placeholder="Search for a country..."
  />`,
  styles: [
    `
      input {
        width: 100%;
        background-color: var(--clr-primary);
        color: var(--clr-text);
        padding: 1rem;
        border: none;
      }

      input:focus {
        outline: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>();

  onChange(event: any) {
    this.searchTerm.emit(event.target.value);
  }
}
