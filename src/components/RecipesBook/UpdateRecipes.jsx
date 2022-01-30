import React, {useState} from 'react';
import IngredientItem from './IngredientItem';
import MyButton from '../UI/button/MyButton'
import MyInput from '../UI/input/MyInput';
import MySelect from '../UI/select/MySelect';
import {FormErrors} from './FormError';
import '../../styles/App.css';

function UpdateRecipes({recipes, fSet, btnDelete, fRecipeDelete}) {
  console.log('Form');
  const [formErrors, setFormErrors] = useState({
    title: '',
    ingr: '',
    amount: ''
  });

  const [titleValid, setTitleValid] = useState(false);
  const [ingrValid, setIngrValid] = useState(false);
  const [amountValid, setAmountValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [values, setValues] = useState({
    title: '',
    ingr: '',
    amount: '',
    measurement: 'г'
  });
  
  const [newIngrs, setNewIngrs] = useState([]);
  
  btnDelete=true;

  const fDelIngr = (delIngr) => {
    setNewIngrs(newIngrs.filter(item => item.ingr !== delIngr));
  }

  const fValidateForm = () => {
    if(titleValid && ingrValid && amountValid) {setFormValid(true)};
  }

  const fTitle = (val) => (setTitleValid(val));
  const fIngr = (val) => (setIngrValid(val));
  const fAmount = (val) => (setAmountValid(val));

  const fValidateField = (fieldName, value) => {
    let fieldIfErr = formErrors;
    const isTitleV = str => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isIngrV = str => /^[0-9A-ZА-ЯЁіїІЇєЄ() -]+$/i.test(str);
    const isAmountV = str => /^[1-9]\d*(\.\d+)?$/.test(str);
    let field;

    switch (fieldName) {
      case 'title':
        field = isTitleV(value);
        fieldIfErr.title = (field===true) ? '' : 'Назва рецепту може містити букви, цифри, (, ), -';    
        fTitle(field);
        fValidateForm();
        break;
      case 'ingr':
        field = isIngrV(value);
        fieldIfErr.ingr = (field===true) ? '' : 'Назва продукту може містити букви, цифри, (, ), -';       
        fIngr(field); 
        fValidateForm();
        break;
      case 'amount':
        field = isAmountV(value);
        fieldIfErr.amount = (field===true) ? '' : 'Кількість продукту має бути більше 0';
        fAmount(field);
        if(fieldIfErr.amount==='' && titleValid && ingrValid) {setFormValid(true)} else setFormValid(false);
        break;
      default:
        fValidateForm();
        break;
    }
     setFormErrors(fieldIfErr); 
     fValidateForm(); 
   }

  const fChangeFieldInput = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setValues(oldValues => ({
      ...oldValues,
      [e.target.name]: value
    }));
    fValidateField(name, value);
  }
     
  const fChangeSelected = (e) => {
      e.preventDefault();
      let value = e.target.value;
      setValues(oldValues => ({
        ...oldValues,
        measurement: value
      }));
      
  }

  const errorClass = (error) => {
      return(error.length === 0 ? '' : 'has-error');
  }

  const fInitValues = () => {
    setValues({title: '', ingr: '', amount: '', measurement: 'г'});
  }

  const fInitValid = () => {
    setIngrValid(false);
    setAmountValid(false);
    setFormValid(false);
  }

  const fAddInput = (e) => {
      e.preventDefault();
      let newValues = {ingr: values.ingr, amount: values.amount, measurement: values.measurement};
      setNewIngrs(oldIngrs => ([...oldIngrs, newValues]));
      setValues({...values, ingr: '', amount: '', measurement: 'г'});
      fInitValid();
    }

  const funcSave = (e) => {
    let newRecipe = {
      id: Date.now(),
      title: values.title,
      ingredients: newIngrs,
      coef: 1
    }
    fInitValues();
    fInitValid();
    setNewIngrs([]);
    fSet(newRecipe);
  }
  const NoClick = false;

  return ( 
    <div className = "UpdateRecipes" >
      <div className = "newRecipe" >
        <div className = "input_secton" >
        {/* action = "HandlerForm.php method = POST"                    */}
        <form >
            <div className = "ifErr" >
              <FormErrors formErrors = {formErrors}/>  
            </div>
          <MyInput className={`form_group ${errorClass(formErrors.title)}`}
            type = "text"
            autoFocus = "true"
            name = "title"
            placeholder = "назва рецепту"
            value = {values.title}
            onChange = {
              (e)=> fChangeFieldInput(e)
            }
            required 
          />
          <div className = "form_inp" >
            <div className="inp_group">
              <MyInput style={{width: "55%"}} className={`form_group ingr ${errorClass(formErrors.ingr)}`}
                // autoFocus = {ifAdded ? "true" : "false"}
                type = "text"
                name = "ingr"
                placeholder = "продукт"
                value = {values.ingr}
                id = 'product'
                onChange = {
                  (e)=> fChangeFieldInput(e)
                }
                required 
              />
              <MyInput  style={{width: "28%"}} className={`form_group amount ${errorClass(formErrors.amount)}`}
                type = "text"
                name = "amount"
                placeholder = "кількість"
                value = {values.amount}
                onChange = {
                  (e) => fChangeFieldInput(e)
                }
                required min = "1"
                max = "20000"
                step = "any" 
              />
              <MySelect style={{width: "17%"}}
                value={values.measurement}
                onChange = {e => fChangeSelected(e)} 
                options = {[
                  {value: "г", name: "грами"},
                  {value: "л", name: "літри"},
                  {value: "шт", name: "штуки"}
                ]}

                >
              </MySelect> 
            </div>
            <div className="btn_delete">
              <MyButton onClick = {(e) => fAddInput(e)} 
              disabled={!formValid}>додати продукт</MyButton>
            </div>
          </div> 
          {(newIngrs.length > 0) ? <div><h4>Новий рецепт: {values.title}</h4></div> : null}
          {(newIngrs.length > 0) ? <hr style={{marginTop: "1px", marginBottom: "0", borderTop: "none", height: "1px"}}/> : null}
          { (newIngrs.length > 0) && (
            newIngrs.map(item => 
              < IngredientItem key = {item.ingr} ingredient = {item} fPotreb={NoClick} coef={1} btnDelete={true} fDelIngr={fDelIngr}/>)
            )
          } 
          <div>
            <MyButton type = "submit"
              onClick = {
                 (e) => funcSave(e)
              } disabled={!(newIngrs.length > 0)}> 
              зберегти рецепт 
            </MyButton> 
          </div> 
        </form> 
      </div> 
      <hr/>
      </div> 
    </div>
  );
}

  export default UpdateRecipes;