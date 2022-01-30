import React from 'react';
import MyButton from '../UI/button/MyButton';
import classes from '../../styles/IngredientItem.module.css';
const IngredientItem = ({onMarked, fPotreb, ingredient, coef, id, btnDelete, fDelIngr}) => {
  
  let icoef = coef;
  let fDelRow = () => {
    fDelIngr(ingredient.ingr);
  }
  function ContentEditable(e) {
    if (typeof (fPotreb) === "function") {  
      e.preventDefault();
      debugger;
      let newCoef=0;
      let newAmount=prompt('Введіть іншу кількість для продукта '+ingredient.ingr);
      if (/^[1-9]\d*(\.\d+)?$/.test(newAmount)) {
        newCoef = +newAmount/ingredient.amount;
      } else newAmount =prompt('Помилка! Спробуйте ще раз!');
      if (newCoef>0) {
        onMarked(newCoef);
        icoef= newCoef;
        fPotreb(icoef, id);
        return icoef;
      }
    }
  }

debugger;
  return (
    <div className={classes.ingredient}>      
        <ul className = {classes.ul}>
        
           <li className={classes.li}>
             {ingredient.ingr}
           </li>
           <li className={classes.li} onClick={e => ContentEditable(e)}>
             {+ingredient.amount*icoef}
           </li>
           <li className={classes.li}>
             {ingredient.measurement}
           </li>
        </ul>     
        {btnDelete && <div className="btn_delete">
          <MyButton onClick={fDelRow}>видалити строку</MyButton>
        </div>}
    </div>
  )
}
export default IngredientItem;