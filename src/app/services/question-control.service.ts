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
        group[question.key].addValidators(Validators.maxLength(5));
      }
    });
    return new FormGroup(group);
  }
}
