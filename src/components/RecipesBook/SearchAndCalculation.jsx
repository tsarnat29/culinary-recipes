import { useState } from "react";
import RecipeItem from "./RecipeItem";
import ReadFile from "./ReadFile";
import { fDemand } from "../../fDemand";

const SearchAndCalculation = ({recipes, fSetRecipes, fLoaded, isFileLoaded}) => {
	
	const [value, setValue] = useState('');
	const [calcRecipe, setCalcRecipe] = useState([]);
	const [stateDemand, setStateDemand] = useState([]);

	const fFormCheck =   (e) => {
		e.preventDefault();
		let value = e.target.value;
		setValue(value);
		let arr = JSON.parse(JSON.stringify([...calcRecipe]));
		let rec = JSON.parse(JSON.stringify((recipes.find(item => item.title===value))));
		setCalcRecipe([...calcRecipe, rec]);
		setValue('');
		setStateDemand(fDemand([...arr, rec]));
  }
	const fPotreb = (icoef, id) => {  
    let index = calcRecipe.findIndex(item=>item.id===id);
    let rec=[...calcRecipe];    
    rec[index].coef=icoef;
    setStateDemand(()=>fDemand(rec));
    setCalcRecipe(rec);
  }
	
	const lengthRecipes = recipes.length;

return (
	lengthRecipes
		?
	<div className="search">
		<h4>Почніть набирати назву рецепту</h4>
		<input type="text" list="search" onChange={(e)=>fFormCheck(e)} value = {value}/>
		<datalist id="search">
			{recipes.map((item, ind)=> <option key = {ind} >{item.title}</option>)}
		</datalist>
		{calcRecipe.length !== 0 ?   (calcRecipe.map(recipe =><RecipeItem key = {recipe.id} recipe = {recipe} fPotreb={fPotreb}/>)) : null}
    {stateDemand.length > 0 ? <h2>Потреба в продуктах на обрані рецепти</h2> : null}
      <ul>{stateDemand.map((item, index) => <li key = {index}>{item[0]} - {item[1]}</li>)}</ul>
	</div>
		:
	<div>
	<h4 style={{backgroundColor: "rgb(19, 3, 3)", color: "rgb(255, 215, 0)", padding: "10px", textAlign: "center"}}>Оберить файл з рецептами</h4>
	<ReadFile recipes={recipes} fSetRecipes={fSetRecipes} fLoaded={fLoaded} isFileLoaded={isFileLoaded} />
 </div>
)
}
export default SearchAndCalculation;