import { useState, useCallback } from 'react';

type TValues<T> = {
  [key: string]: T;
};

export function useFormAndValidation() {
  const [values, setValues] = useState<TValues<string>>({});
  const [errors, setErrors] = useState<TValues<string>>({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setErrors({ ...errors, [id]: e.target.validationMessage });
    setIsValid((e.target as HTMLElement).closest('form')!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    handleBlur,
  };
}

export default useFormAndValidation;
