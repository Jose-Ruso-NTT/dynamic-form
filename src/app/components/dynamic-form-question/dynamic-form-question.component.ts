import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuestionBase } from '../../services/models/question-base.class';
import { FormErrorComponent } from '../form-error/form-error.component';
import { MatErrorMessagesComponent } from '../mat-error-messages/mat-error-messages.component';

@Component({
  selector: 'app-dynamic-form-question',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorComponent,
    MatFormFieldModule,
    MatInputModule,
    MatErrorMessagesComponent,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.css',
})
export class DynamicFormQuestionComponent {
  question = input.required<QuestionBase<string>>();
  @Input({ required: true }) form!: FormGroup;
}
