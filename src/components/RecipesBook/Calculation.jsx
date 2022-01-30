import { useState, useEffect } from "react";
import CheckedRecipes from "../../CheckedRecipes";
import ReadFile from "./ReadFile";
import RecipeItem from "./RecipeItem";
import { fSelectRecipes } from "../../fSelectRecipes";
import { fDemand } from "../../fDemand";
import MyButton from "../UI/button/MyButton";
import classes from '../../styles/Calculation.module.css';

const Calculation = ({recipes, fSetRecipes, fLoaded, isFileLoaded}) => {
   
const [check, setCheck] = useState( Array(recipes.length).fill(false));
const [count, setCount] = useState(0);
const [enableButton, setEnable] = useState(false);
const [calcRecipe, setCalcRecipe] = useState([]);
const [stateDemand, setStateDemand] = useState([]);

useEffect(() => {
	if (count>0) {
		setEnable(true)
	} else {
		setEnable(false)
	}
}, [count])

const fCheck = (i) => {
   const checkCopy = [...check];
   checkCopy[i] = !checkCopy[i];
   checkCopy ? setCount((old)=>old+1) : setCount((old)=>old-1);
   setCheck(checkCopy);
}
  
const fPotreb = (icoef, id) => {  
   
   let index = calcRecipe.findIndex(item=>item.id===id);
   let rec=[...calcRecipe];   
   rec[index].coef=icoef;
   setStateDemand(()=>fDemand(rec));
   setCalcRecipe(rec);
}
  
const fSelectedRecipes = (e) => {
   e.preventDefault();
   const rec = fSelectRecipes(check, recipes);
   setCalcRecipe(()=>rec);
   setStateDemand(fDemand(rec));
} 
const lengthRecipes = recipes.length;

return (  
   <>  
      {
         lengthRecipes
         ?
      <div className={classes.wrapCalc}>
        <h4>Виберіть рецепти для розрахунку потреби продуктів</h4>
        <div className={classes.calc}>
          {recipes.map((item, index) => <CheckedRecipes key={index} ind={index} check={check} fCheck={fCheck} item={item}/> )}
        </div>
        <MyButton disabled={!enableButton} onClick={(e)=>fSelectedRecipes(e)}>Розрахувати обране</MyButton>
          {isFileLoaded &&  
          (calcRecipe.map(recipe =><RecipeItem key = {recipe.id} recipe = {recipe} fPotreb={fPotreb} btnDelete={false}/>))}
          {(stateDemand.length > 0) && <h2>Потреба в продуктах на обрані рецепти</h2>}
         <ul className= {classes.emojiCook} style={{marginLeft:'20px'}}>{stateDemand.map((item, index) => <li key = {index}>{item[0]} - {item[1]}</li>)}</ul>
      </div>
         :
      <div>
        <h4 style={{backgroundColor: "rgb(19, 3, 3)", color: "rgb(255, 215, 0)", padding: "10px", textAlign: "center"}}>Оберить файл з рецептами</h4>
        <ReadFile recipes={recipes} fSetRecipes={fSetRecipes} fLoaded={fLoaded} isFileLoaded={isFileLoaded} />
      </div>
      }
      </>
    )
}
export default Calculation;
