import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Error from "./Error";
import { download } from "./components/RecipesBook/download";
import ShowRecipes from "./components/RecipesBook/ShowRecipes";
import Calculation from "./components/RecipesBook/Calculation";
import SearchAndCalculation from "./components/RecipesBook/SearchAndCalculation";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  const fSetRecipes = (arr) => {
    if (Array.isArray(arr)) setRecipes([...JSON.parse(JSON.stringify(arr))]); 
    else setRecipes([])
  };
  const fSet = (newRec) => setRecipes([...JSON.parse(JSON.stringify(recipes)), newRec]);

  const fRecipeDelete = (idRecipe) => {
    let copyRecipes = recipes.filter(item => item.id !== idRecipe);
    setRecipes(copyRecipes);
    let text = JSON.stringify([...copyRecipes]);
    download("text.txt", text);
  }

  const fLoaded = (resLoad) => {
    setIsFileLoaded(resLoad);
  }
  
  return ( 
    <>
        <Router>
          <Header/>
          <Routes> 
            <Route path="/" element={<ShowRecipes recipes = {recipes}  fRecipeDelete={fRecipeDelete} fSetRecipes={fSetRecipes} fSet = {fSet} fLoaded={fLoaded}/>}/>

            <Route path="/calculate" element={<Calculation recipes={recipes} fSetRecipes={fSetRecipes} fLoaded={fLoaded} isFileLoaded={isFileLoaded}/>}/>

            <Route path="/forSearch" element={<SearchAndCalculation recipes={recipes} fSetRecipes={fSetRecipes} fLoaded={fLoaded} isFileLoaded={isFileLoaded}/>}/>

            <Route path="*" element={<Error/>}/>
          </Routes>
        </Router>
    </>
  )
}
export default App;