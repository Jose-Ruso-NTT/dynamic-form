import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { QuestionBase } from './models/question-base';
import { DropdownQuestion } from './models/question-dropdown';
import { TextboxQuestion } from './models/question-textbox';

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
        value: 'Alex',
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
      new TextboxQuestion({
        key: 'checkbox',
        label: 'checkbox',
        type: 'checkbox',
        order: 5,
        requiredTrue: true,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
