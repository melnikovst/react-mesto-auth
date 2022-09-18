import {useState, useCallback} from 'react';

export function useFormAndValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = (e) => {
        const {id, value} = e.target
        setValues({...values, [id]: value});
    };

    const handleBlur = (e) => {
        const {id} = e.target;
        setErrors({...errors, [id]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    }

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return {values, handleChange, errors, isValid, resetForm, setValues, setIsValid, handleBlur};
}


export default useFormAndValidation;