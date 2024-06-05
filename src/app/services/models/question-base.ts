export class QuestionBase<T> {
  value?: T;
  disabled?: boolean;
  key: string;
  label: string;
  required: boolean;
  requiredTrue: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  order: number;
  controlType: string;
  type: HTMLInputTypeAttribute;
  options: KeyValue[];

  constructor(
    options: {
      value?: T;
      disabled?: boolean;
      key?: string;
      label?: string;
      required?: boolean;
      requiredTrue?: boolean;
      min?: number;
      max?: number;
      maxLength?: number;
      minLength?: number;
      pattern?: string;
      order?: number;
      controlType?: string;
      type?: HTMLInputTypeAttribute;
      options?: KeyValue[];
    } = {},
  ) {
    this.value = options.value;
    this.disabled = !!options.disabled;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.requiredTrue = !!options.requiredTrue;
    this.min = options.min;
    this.max = options.max;
    this.minLength = options.minLength;
    this.maxLength = options.maxLength;
    this.pattern = options.pattern;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}

export interface KeyValue {
  key: string;
  value: string;
}

type HTMLInputTypeAttribute =
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | '';
