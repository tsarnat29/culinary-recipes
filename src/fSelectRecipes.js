export const fSelectRecipes = (check, recipes) => {
  const copyRecipes = JSON.parse(JSON.stringify(recipes));
  const selectRecipes = [...check].reduce((selectRecipes, item, i)=>{return (item) ? [...selectRecipes, copyRecipes[i]] : [...selectRecipes] },[]);
  return selectRecipes;
} 