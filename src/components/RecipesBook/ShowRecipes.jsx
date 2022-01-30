import React from "react";
import Form from "./Form";
import ReadFile from "./ReadFile";

const ShowRecipes = ({recipes, btnDelete, fRecipeDelete, fSetRecipes, fSet, fLoaded}) => {
 
  return (
    <div>
      <ReadFile recipes={recipes} fSetRecipes={fSetRecipes} fLoaded={fLoaded} />
      <Form recipes={recipes} fSet={fSet} fSetRecipes={fSetRecipes} btnDelete={btnDelete} fRecipeDelete={fRecipeDelete} fLoaded = {fLoaded}/>
    </div>  
  )
}
export default ShowRecipes;