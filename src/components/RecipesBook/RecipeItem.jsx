import IngredientItem from "./IngredientItem";
import { useState } from "react";
import MyButton from "../UI/button/MyButton";
import classes from '../../styles/RecipeItem.module.css';

const RecipeItem = ({recipe, fPotreb, btnDelete, fRecipeDelete}) => {
  
  const copyRecipe = JSON.parse(JSON.stringify(recipe));
  const [editCoef, setEditCoef] = useState(copyRecipe.coef);

  const fRecDel = () => {
    fRecipeDelete(copyRecipe.id);
  }

  const fChangeAmount = (coef) => {
    setEditCoef(coef);
    copyRecipe.coef = editCoef;
  }

  return (
    <div className="recipe">
      <div className={classes.recipe_content}>
        <strong>{copyRecipe.title}</strong>
        {btnDelete && <div className="btn_delete">
          <MyButton onClick={fRecDel}>видалити рецепт</MyButton>
        </div>}
      </div>
      <div className={classes.recipe_ingredients}>
          {copyRecipe.ingredients.map(ingredient => 
            <IngredientItem key={ingredient.ingr} onMarked={fChangeAmount} fPotreb={fPotreb} ingredient={ingredient} coef={editCoef} id={copyRecipe.id} btnDelete = {false} />
          )}
      </div>        
    </div>
  )
}
export default RecipeItem;