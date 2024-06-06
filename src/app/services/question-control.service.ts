import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './models/question-base.class';

@Injectable()
export class QuestionControlService {
  /**
   * Creates a FormControl for a given question, adding the appropriate validators based on the question's properties.
   *
   * @param {QuestionBase<string>} question The question object containing properties to determine validators.
   * @returns {FormControl} The created FormControl with applied validators.
   */
  #createFormControl(question: QuestionBase<string>): FormControl {
    const control = new FormControl({
      value: question.value || '',
      disabled: question.disabled || false,
    });

    const validatorsConfig = [
      { condition: question.required, validator: Validators.required },
      { condition: question.requiredTrue, validator: Validators.requiredTrue },
      { condition: question.type === 'email', validator: Validators.email },
      {
        condition: question.maxLength !== undefined,
        validator: Validators.maxLength(question.maxLength!),
      },
      {
        condition: question.minLength !== undefined,
        validator: Validators.minLength(question.minLength!),
      },
      {
        condition: question.max !== undefined,
        validator: Validators.max(question.max!),
      },
      {
        condition: question.min !== undefined,
        validator: Validators.min(question.min!),
      },
      {
        condition: question.pattern !== undefined,
        validator: Validators.pattern(question.pattern!),
      },
    ];

    const validators = validatorsConfig.filter((config) => config.condition).map((config) => config.validator);

    control.addValidators(validators);

    return control;
  }

  /**
   * Converts an array of questions into a FormGroup with corresponding FormControls.
   *
   * @param {QuestionBase<string>[]} questions The array of questions to convert into FormControls.
   * @returns {FormGroup} The created FormGroup containing the FormControls for each question.
   */
  toFormGroup(questions: QuestionBase<string>[]): FormGroup {
    const group: { [key: string]: FormControl } = {};

    questions.forEach((question) => {
      group[question.key] = this.#createFormControl(question);
    });

    return new FormGroup(group);
  }
}
