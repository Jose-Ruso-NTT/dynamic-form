import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from './models/question-base.class';
import { CheckboxQuestion } from './models/question-checkbox.class';
import { DatePickerQuestion } from './models/question-date-picker.class';
import { DropdownQuestion } from './models/question-dropdown.class';
import { TextboxQuestion } from './models/question-textbox.class';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          { key: 'cat', value: 'Cat' },
          { key: 'dog', value: 'Dog' },
          { key: 'horse', value: 'Horse' },
          { key: 'capybara', value: 'Capybara' },
        ],
        order: 3,
      }),
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1,
      }),
      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
      new TextboxQuestion({
        key: 'age',
        label: 'Age',
        type: 'number',
        min: 2,
        max: 18,
        order: 4,
      }),
      new CheckboxQuestion({
        key: 'terms',
        label: 'Agree terms and conditions',
        order: 6,
        requiredTrue: true,
      }),
      new DatePickerQuestion({
        key: 'fromDate',
        label: 'Date',
        order: 5,
        required: true,
        hint: 'MM/DD/YYYY',
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
