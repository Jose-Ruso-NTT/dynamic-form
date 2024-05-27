import {
  Component,
  DestroyRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent implements OnChanges {
  #destroy = inject(DestroyRef);

  @Input() control: AbstractControl | null = null;
  @Input() customErrors: { [key: string]: string } = {};

  errorMessages: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.#subscribeToControlChanges();
    }
    this.#updateErrorMessages();
  }

  #subscribeToControlChanges(): void {
    if (this.control) {
      merge(this.control.statusChanges, this.control.valueChanges)
        .pipe(takeUntilDestroyed(this.#destroy))
        .subscribe(() => {
          this.#updateErrorMessages();
        });
    }
  }

  #updateErrorMessages(): void {
    if (!this.control || !this.control.errors) {
      this.errorMessages = [];
      return;
    }

    this.errorMessages = Object.keys(this.control.errors).map((key) =>
      this.#getErrorMessage(key, this.control!.errors![key])
    );
  }

  #getErrorMessage(errorKey: string, errorValue: any): string {
    const errorMessagesMap: { [key: string]: (errorValue: any) => string } = {
      minlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener al menos ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
      maxlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener al máximo ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
      min: ({ min, actual }) =>
        `El valor mínimo de este campo debe ser ${min} pero es ${actual}.`,
      max: ({ max, actual }) =>
        `El valor máximo de este campo debe ser ${max} pero es ${actual}.`,
      required: () => 'Este campo es requerido',
      pattern: () => 'Patrón inválido',
      email: () => 'Correo electrónico inválido',
    };

    return (
      this.customErrors[errorKey] ||
      errorMessagesMap[errorKey](errorValue) ||
      'Error desconocido'
    );
  }
}
