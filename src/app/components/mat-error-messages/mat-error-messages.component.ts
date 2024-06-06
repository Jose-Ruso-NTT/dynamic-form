import { AfterViewInit, Component, DestroyRef, Injector, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: '[matErrorMessages]',
  standalone: true,
  template: '{{ error() }}',
  styleUrl: './mat-error-messages.component.css',
})
export class MatErrorMessagesComponent implements AfterViewInit {
  #destroy = inject(DestroyRef);
  #inj = inject(Injector);

  @Input() customErrors: { [key: string]: string } = {};

  error = signal('');
  #inputRef!: MatFormFieldControl<MatInput>;

  ngAfterViewInit(): void {
    const container = this.#inj.get(MatFormField);
    this.#inputRef = container._control;

    this.#inputRef.ngControl?.statusChanges
      ?.pipe(takeUntilDestroyed(this.#destroy))
      .subscribe(() => this.#updateErrorMessage());

    this.#updateErrorMessage();
  }

  #updateErrorMessage(): void {
    const controlErrors = this.#inputRef.ngControl?.errors;
    if (!controlErrors) return;

    const errorMessages = Object.keys(controlErrors).map((key) => this.#getErrorMessage(key, controlErrors[key]));
    this.error.set(errorMessages[0]);
  }

  #getErrorMessage(errorKey: string, errorValue: any): string {
    const errorMessagesMap: { [key: string]: (errorValue: any) => string } = {
      minlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener al menos ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
      maxlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener como máximo ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
      min: ({ min, actual }) => `El valor mínimo de este campo debe ser ${min} pero es ${actual}.`,
      max: ({ max, actual }) => `El valor máximo de este campo debe ser ${max} pero es ${actual}.`,
      required: () => 'Este campo es requerido',
      pattern: () => 'Patrón inválido',
      email: () => 'Correo electrónico inválido',
    };

    return this.customErrors[errorKey] || errorMessagesMap[errorKey](errorValue) || 'Error desconocido';
  }
}
