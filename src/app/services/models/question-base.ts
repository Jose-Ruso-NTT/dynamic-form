export class QuestionBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  order: number;
  controlType: string;
  type: string;
  options: KeyValue[];

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      min?: number;
      max?: number;
      maxLength?: number;
      minLength?: number;
      pattern?: string;
      order?: number;
      controlType?: string;
      type?: string;
      options?: KeyValue[];
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
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
