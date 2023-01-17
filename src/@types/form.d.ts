declare interface FormProps<T extends Object> {
  initialValues?: T;
  onSubmit: (values: T) => Promise<void> | void;
}
