import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './models/question-base';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = new FormControl(question.value || '');

      if (question.required) {
        group[question.key].addValidators(Validators.required);
      }

      if (question.type === 'email') {
        group[question.key].addValidators(Validators.email);
      }

      if (question.maxLength) {
        group[question.key].addValidators(
          Validators.maxLength(question.maxLength)
        );
      }

      if (question.minLength) {
        group[question.key].addValidators(
          Validators.minLength(question.minLength)
        );
      }

      if (question.max) {
        group[question.key].addValidators(Validators.max(question.max));
      }

      if (question.min) {
        group[question.key].addValidators(Validators.min(question.min));
      }

      if (question.pattern) {
        group[question.key].addValidators(Validators.pattern(question.pattern));
      }
    });
    return new FormGroup(group);
  }
}
