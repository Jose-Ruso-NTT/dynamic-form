import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { QuestionBase } from '../../services/models/question-base.class';
import { QuestionControlService } from '../../services/question-control.service';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule, MatButtonModule],
  providers: [QuestionControlService],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent implements OnInit {
  #qcs = inject(QuestionControlService);

  questions = input<QuestionBase<string>[] | null>([]);

  form!: FormGroup;
  payLoad = signal('');

  ngOnInit(): void {
    this.form = this.#qcs.toFormGroup(this.questions() as QuestionBase<string>[]);
  }

  onSubmit() {
    this.form.markAllAsTouched();

    this.payLoad.set(JSON.stringify(this.form.getRawValue()));
  }
}
