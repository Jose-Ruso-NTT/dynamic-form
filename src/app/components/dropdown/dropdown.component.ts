import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  isMenuOpen = false;
  options = ['Opción 1', 'Opción 2', 'Opción 3'];
  activeOptionIndex: number | null = null;
  selectedOption: string | null = null;

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      this.activeOptionIndex = this.selectedOption ? this.options.indexOf(this.selectedOption) : 0;
      setTimeout(() => this.focusOption(this.activeOptionIndex), 0);
    }
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    console.log(`Seleccionaste: ${option}`);
    this.isMenuOpen = false;
  }

  handleKeydown(event: KeyboardEvent, index?: number): void {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'Enter':
        if (index !== undefined && this.isMenuOpen) {
          this.selectOption(this.options[index]);
        }
        break;
      case 'Escape':
        this.isMenuOpen = false;
        break;
    }
  }

  navigateOptions(step: number): void {
    if (this.activeOptionIndex !== null) {
      const newIndex = (this.activeOptionIndex + step + this.options.length) % this.options.length;
      this.activeOptionIndex = newIndex;
      this.focusOption(this.activeOptionIndex);
    }
  }

  focusOption(index: number | null): void {
    if (index !== null) {
      const optionElements = document.querySelectorAll<HTMLElement>('.menu-item');
      optionElements[index]?.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(): void {
    this.isMenuOpen = false;
  }
}
