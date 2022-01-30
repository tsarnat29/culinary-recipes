export const fDemand = (selectedRecipes) => {
  const arrIngredients = selectedRecipes.map(recipe=> {
    return recipe.ingredients.reduce((acc, row) =>
    [...acc, [row.ingr, row.amount*recipe.coef]], [])}
    );
   const arrUnit = arrIngredients.flat();

  const demands = arrUnit.reduce((demand, item) => {
          let ingr = item[0];
          if (ingr === "жовтки") ingr = "яйце";
          if (ingr === "фарш") ingr = "м'ясо";
          if (ingr === "фарш рибний") ingr = "риба";
          demand[ingr] = (demand[ingr]||0) + item[1];   
          return demand;
      }, {}) 
      
      const forOut = Object.entries(demands);
      return forOut;
}