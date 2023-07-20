import { useState } from 'react';
import type { EventChangeType } from 'shared/types';

export type FormState<T> = Record<string, T>;

interface ValidationResultSchema<T> {
  errorMessages: Partial<Record<keyof T, string>>;
  hasError: boolean;
}

interface ErrorMessageSchema {
  maxLength: string;
  minLength: string;
  pattern: string;
  required: string;
}

interface FieldValidationSchema {
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  required?: boolean;
}

export type ValidationSchemaType<T> = Partial<
  Record<keyof T, FieldValidationSchema>
>;

interface UseFormProps<T> {
  errors: ValidationResultSchema<T>;
  form: T;
  handleChange: (event: EventChangeType) => void;
  passObjectToForm: (obj: Partial<T>) => void;
  resetForm: () => void;
  setForm: (state: T) => void;
  transformToFormData: (form: T) => FormData;
  validate: () => ValidationResultSchema<T>;
}

const errorMessages: ErrorMessageSchema = {
  maxLength: 'Field exceeds maximum length.',
  minLength: 'Field does not meet minimum length.',
  pattern: 'Field does not match the specified pattern.',
  required: 'Field is required.',
};

const useForm = <T extends object>(
  defaultValues: T,
  validationSchema: ValidationSchemaType<T> = {},
): UseFormProps<T> => {
  const [form, setForm] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<ValidationResultSchema<T>>({
    errorMessages: {},
    hasError: false,
  });

  const handleChange = (event: EventChangeType) => {
    const { name, value } = event.target;
    setForm((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const passObjectToForm = (obj: Partial<T>) => {
    setForm((formData) => ({
      ...formData,
      ...obj,
    }));
  };

  const transformToFormData = (form: T) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value as string);
    }
    return formData;
  };

  const validate = (): ValidationResultSchema<T> => {
    const validationResult: ValidationResultSchema<T> = {
      errorMessages: {},
      hasError: false,
    };

    for (const fieldName in validationSchema) {
      if (fieldName in form) {
        const fieldValidation = validationSchema[fieldName]!;
        const value = form[fieldName];
        // Type guard to check if value is a string before calling trim and length
        if (
          fieldValidation.maxLength &&
          typeof value === 'string' &&
          value.length > fieldValidation.maxLength
        ) {
          validationResult.hasError = true;
          validationResult.errorMessages[fieldName] = errorMessages.maxLength;
        }
        if (
          fieldValidation.pattern &&
          typeof value === 'string' &&
          !fieldValidation.pattern.test(value)
        ) {
          validationResult.hasError = true;
          validationResult.errorMessages[fieldName] = errorMessages.pattern;
        }
        if (
          fieldValidation.minLength &&
          typeof value === 'string' &&
          value.length < fieldValidation.minLength
        ) {
          validationResult.hasError = true;
          validationResult.errorMessages[fieldName] = errorMessages.minLength;
        }
        if (
          fieldValidation.required &&
          typeof value === 'string' &&
          value.trim() === ''
        ) {
          validationResult.hasError = true;
          validationResult.errorMessages[fieldName] = errorMessages.required;
        }
        if (fieldValidation.required && Array.isArray(value) && !value.length) {
          validationResult.hasError = true;
          validationResult.errorMessages[fieldName] = errorMessages.required;
        }
      }
    }

    setErrors(validationResult);
    return validationResult;
  };

  const resetForm = () => {
    setForm(defaultValues);
  };

  return {
    form,
    handleChange,
    passObjectToForm,
    resetForm,
    setForm,
    errors,
    transformToFormData,
    validate,
  };
};

export default useForm;
