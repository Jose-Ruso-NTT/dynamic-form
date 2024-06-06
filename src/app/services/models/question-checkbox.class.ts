import { QuestionBase } from './question-base.class';

export class CheckboxQuestion extends QuestionBase<string> {
  override controlType = 'checkbox';
}
