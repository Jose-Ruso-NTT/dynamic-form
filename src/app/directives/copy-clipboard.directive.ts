// src/app/clipboard.directive.ts

import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClipboard]',
  standalone: true,
})
export class ClipboardDirective {
  /**
   * The text to be copied to the clipboard.
   */
  @Input('appClipboard') textToCopy: string = '';

  constructor() {}

  /**
   * Handles the click event and copies the text to the clipboard.
   */
  @HostListener('click')
  async copyText() {
    if (this.textToCopy) {
      try {
        await navigator.clipboard.writeText(this.textToCopy);
        console.log('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text to clipboard: ', err);
      }
    }
  }
}
