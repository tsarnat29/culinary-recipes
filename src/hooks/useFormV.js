import { useState, useEffect } from "react";

export function useValidation(value, validations) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [titleError, setTitleError] = useState(false);
  const [ingrError, setIngrError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [minNumberError, setMinNumberError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [textError, setTextError] = useState({errEmpty: '', errTitle: '', errIngr: '', errNumber: '', errAmountZero: ''});
debugger;
  useEffect(() => {
    const re = /^[0-9A-ZА-ЯЁіїІЇєЄ\'() -]+$/i;
    const reNumber = /^[1-9]\d*(\.\d+)?$/;
    for (const validation in validations) {
    
      switch (validation) {
        case 'isEmpty':
          if(value)  {setIsEmpty(false)} 
          else {
            console.log('textError=', textError);
            setIsEmpty(true);
            setTextError(t => ({...t, errEmpty:'порожнє поле', errTitle: ''}));
          };
          break;
        case 'minNumber':           
          if (reNumber.test(value))  {
            if(value <= validations[validation])  {
              setMinNumberError(true);
              setTextError(t=>({...t, errEmpty: '', errAmountZero: 'Кількість продукту має бути більше 0'}));
            }  
            else {       
              setMinNumberError(false);
            }
          }
          break;
        case 'isTitle':         
          if(re.test(value)) {setTitleError(false)} 
          else {
            console.log('textError=', textError);
            setTitleError(true);
            setTextError(t=>({...t, errEmpty: '', errTitle: 'Назва рецепту може містити букви, цифри, (, ), -'}));
          }
          break;
        case 'isIngr':
          if(re.test(value)) {setIngrError(false)} 
          else {
            setIngrError(true);
            setTextError(t=>({...t, errEmpty: '', errIngr: 'Назва продукту може містити букви, цифри, (, ), -'}));
          }
          break;
        case 'isNumber':
          if(reNumber.test(value)) {          
            setAmountError(false);}
          else {
            setAmountError(true);
            setTextError(t=>({...t, errEmpty: '', errNumber: 'Кількість має бути числом'}));
          }
          break;
        default:
          break;
      }   
    } 
  }, [value] )

  useEffect(()=> {
    if (isEmpty || minNumberError || titleError || ingrError || amountError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minNumberError, titleError, ingrError, amountError])

  return {
    isEmpty, 
    titleError,
    ingrError,
    amountError,
    minNumberError,
    textError,
    inputValid
  }
};

export function useInput(initialValue, validations) {

    const [value, setValue] = useState(initialValue);
    const [isMarked, setMarked] = useState(false);
    const [nameField, setNameField] = useState('');
  
    const valid = useValidation(value, validations);
    
    const onChange = (e) => {
      setValue(e.target.value);
      setNameField(e.target.name);
    }
  
    const onChangeSelected = (e) => {
      e.preventDefault();
      setValue(e.target.value);
      setNameField(e.target.name);
  }
  
    const onBlur = (e) => {
      setMarked(true);   
    }
  
    const dropValue = () => {
      setMarked(false);
      if (nameField === 'ingr' || nameField === 'amount' || nameField === 'title') {
        setValue('');
      } else {
        setValue('г');
      }
    }
  
    return {
      value,
      onChange,
      onChangeSelected,
      onBlur,
      dropValue,
      isMarked,
      ...valid
    }
  
}
