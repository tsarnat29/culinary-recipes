import React, {useState} from 'react';
import {useInput} from '../../hooks/useFormV';
import { download } from './download';
import RecipeItem from './RecipeItem';
import IngredientItem from './IngredientItem';
import {FormErrors} from './FormError';
import MyButton from '../UI/button/MyButton';
import MyInput from '../UI/input/MyInput';
import MySelect from '../UI/select/MySelect';
import '../../styles/App.css';

function Form({recipes, fSet, fRecipeDelete, fLoaded}) {

  const titleV = useInput('', {isEmpty: true,  isTitle: true });
  const ingrV = useInput('', {isEmpty: true,  isIngr: true});
  const amountV = useInput('', {isEmpty: true,  isNumber: true, minNumber: 0});

  const measurementV = useInput('г');

  const [newIngrs, setNewIngrs] = useState([]);

  const copyRecipes = JSON.parse(JSON.stringify(recipes));
  
  const NoClick = false;
  
  const fDelIngr = (delIngr) => {
    setNewIngrs(newIngrs.filter(item => item.ingr !== delIngr));
  }

  const fAddInput = (e) => {
    e.preventDefault();
    let newValues = {ingr: ingrV.value, amount: amountV.value, measurement: measurementV.value};
    setNewIngrs(oldIngrs => ([...oldIngrs, newValues]));
    ingrV.dropValue('ingr');
    amountV.dropValue('amount');
    measurementV.dropValue('measurement');
  }

  const funcSave = (e) => {
    let newRecipe = {
      id: Date.now(),
      title: titleV.value,
      ingredients: newIngrs,
      coef: 1
    }
    let text = '';
    titleV.dropValue('title');
    ingrV.dropValue('ingr');
    amountV.dropValue('amount');
    measurementV.dropValue('measurement');
    setNewIngrs([]);
    fSet(newRecipe);
    fLoaded(true);
    text = JSON.stringify([...copyRecipes, newRecipe]);
    download("text.txt", text);
  }

debugger;
  return ( 
    <div className = "App" >
      <div className = "newRecipe" >
        <div className = "input_secton" >
        <form >
          {(titleV.isMarked && (titleV.isEmpty || titleV.titleError)) &&
          <div className = "error" >
              <FormErrors formErrors = {titleV.textError}/>  
          </div>}
          <MyInput className={`form_group`}
            type = "text"
            name = "title"
            placeholder = "назва рецепту"
            value = {titleV.value}
            onChange = {e => titleV.onChange(e)}
            onBlur = {titleV.onBlur}
            required 
          />
          {(ingrV.isMarked && (ingrV.isEmpty || ingrV.ingrError)) &&
          <div className = "error" >
              <FormErrors formErrors = {ingrV.textError}/>  
          </div> }
          {(amountV.isMarked && (amountV.isEmpty || amountV.errNumber || amountV.errAmountZero)) &&
          <div className = "error" >
              <FormErrors formErrors = {amountV.textError}/>  
          </div> }
          <div className = "form_inp" >
            <div className="inp_group">
              <MyInput style={{width: "55%"}} className={`form_group ingr`}
                type = "text"
                name = "ingr"
                placeholder = "продукт"
                value = {ingrV.value}
                id = 'product'
                onChange = {e => ingrV.onChange(e)}
                onBlur = {ingrV.onBlur}
                required 
              />
              <MyInput  style={{width: "28%"}} className={`form_group amount`}
                type = "text"
                name = "amount"
                placeholder = "кількість"
                value = {amountV.value}
                onChange = {e => amountV.onChange(e)}
                onBlur = {amountV.onBlur}
                required min = "1"
                max = "20000"
                step = "any" 
              />
              <MySelect style={{width: "17%"}}
                value={measurementV.value}
                name = "measurement"
                onChange = {e => measurementV.onChangeSelected(e)} 
                options = {[
                  {value: "г", name: "грами"},
                  {value: "л", name: "мілілітри"},
                  {value: "шт", name: "штуки"},
                  {value: "ст.л", name: "ст.ложки"},
                  {value: "ч.л.", name: "ч.ложки"},
                  {value: "ст.", name: "стакани"},
                  {value: "щіп", name: "щіпки"} 
                ]}
                >
              </MySelect> 
            </div>
            <div className="btn_delete">
              <MyButton onClick = {(e) => fAddInput(e)} 
              disabled={!titleV.inputValid || !ingrV.inputValid || !amountV.inputValid}>додати продукт</MyButton>
            </div>
          </div> 
          {(newIngrs.length > 0) 
            ? 
            <div>
              <div style={{width: "100%"}}><h4>Новий рецепт: {titleV.value}</h4></div>
              <hr style={{marginTop: "1px", marginBottom: "0", borderTop: "none", height: "1px"}}/>
              {newIngrs.map(item =>  
              < IngredientItem key = {item.ingr} ingredient = {item} fPotreb={NoClick} coef={1} btnDelete={true} fDelIngr={fDelIngr}/>
              )} 
            </div>
            :
            null
          }
          <div>
            <MyButton type = "submit"
              onClick = {e => funcSave(e)} disabled={!(newIngrs.length > 0)}> 
              зберегти рецепт 
            </MyButton> 
          </div> 
        </form> 
      </div> 
      <hr/>
    </div> 
        {recipes.length > 0 &&
        recipes.map(recipe =><RecipeItem key = {recipe.id} recipe = {recipe} btnDelete= {true} fRecipeDelete={fRecipeDelete}/>)       
        } 
    </div>
  );
}

  export default Form;