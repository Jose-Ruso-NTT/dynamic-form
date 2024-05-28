import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../../services/models/question-base';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-dynamic-form-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './dynamic-form-question.component.html',
  styleUrl: './dynamic-form-question.component.css',
})
export class DynamicFormQuestionComponent {
  question = input.required<QuestionBase<string>>();
  @Input({ required: true }) form!: FormGroup;
}
