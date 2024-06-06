import { QuestionBase } from './question-base.class';

export class DatePickerQuestion extends QuestionBase<string> {
  override controlType = 'datepicker';
}
