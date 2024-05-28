import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
  signal,
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
export class FormErrorComponent implements OnInit {
  #destroy = inject(DestroyRef);

  @Input() control!: AbstractControl;
  @Input() customErrors: { [key: string]: string } = {};

  errorMessage = signal('');

  ngOnInit() {
    merge(this.control.statusChanges, this.control.valueChanges)
      .pipe(takeUntilDestroyed(this.#destroy))
      .subscribe(() => this.#updateErrorMessage());
  }

  #updateErrorMessage(): void {
    if (!this.control.errors) {
      this.errorMessage.set('');
      return;
    }

    const errorMessages = Object.keys(this.control.errors).map((key) =>
      this.#getErrorMessage(key, this.control.errors![key])
    );
    this.errorMessage.set(errorMessages[0]);
  }

  #getErrorMessage(errorKey: string, errorValue: any): string {
    const errorMessagesMap: { [key: string]: (errorValue: any) => string } = {
      minlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener al menos ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
      maxlength: ({ requiredLength, actualLength }) =>
        `Este campo debe tener como máximo ${requiredLength} caracteres pero tiene ${actualLength} carácter/es.`,
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
