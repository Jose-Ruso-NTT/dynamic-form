import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionBase } from '../../services/models/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, DynamicFormQuestionComponent, ReactiveFormsModule],
  providers: [QuestionControlService],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent {
  questions = input<QuestionBase<string>[] | null>([]);
  form!: FormGroup;
  payLoad = signal('');

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(
      this.questions() as QuestionBase<string>[]
    );
  }

  onSubmit() {
    this.payLoad.set(JSON.stringify(this.form.getRawValue()));
  }
}
