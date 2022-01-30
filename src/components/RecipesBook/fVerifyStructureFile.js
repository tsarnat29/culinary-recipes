export const fVerifyStructureFile = (arr) => {
  let flagErr = '';
  debugger;
  const errStructure = (obj, cause) =>{
    flagErr = '';
    switch(cause) {
      case "size":
        flagErr = flagErr + `Перевірте структуру файлу:  Кожен рецепт має містити назви полей:
        id - унікальний ідентифікатор
        title - унікальна назва рецепту
        ingredients - масив інгредієнтів за структурою: назва продукту, кількість, одиниця виміру (грами, литри, штуки)
        coef - коефіцієнт розрахунку потреби а продуктах (в файлі він дорівнює 1)`;
        break;
      case "title":
        flagErr = flagErr + 'Відсутнє поле назви рецепту title';
        break;
      case "ingredients":
        flagErr = flagErr + 'Відсутній масив з інгредіентами ingredients';
        break;
      case "coef":
        flagErr = flagErr + 'Відсутній коефіцієнт для розрахунку coef';
        break;
      case "ingr":
        flagErr = flagErr + 'В масиві інгредієнтів відсутня назва продукту ingr';
        break;
      case "amount":
        flagErr = flagErr + 'В масиві інгредієнтів відсутня кілкість продукту amount';
        break;
      case "measurement": 
        flagErr = flagErr + 'В масиві інгредієнтів відсутня одиниця виміру продукту measurement';
        break;
      case "ingredientsIsNotArray":
        flagErr = flagErr + 'ingredients не є масивом';
        break;
      case "coefIsNotNumber":
        flagErr = flagErr + 'coef не є числовим';
        break;
      default:
        break;
    }
    if (flagErr !== '') flagErr = JSON.stringify(obj) +flagErr;
    return flagErr;
  }

  if (typeof arr === 'object' && arr !== null) {
    if (Array.isArray(arr)) {
      arr.forEach(obj => {
        const strukture = Object.keys(obj);
        const objToString = JSON.stringify(obj);
        const size = strukture.length;
        if (size < 4) errStructure(obj, "size");
        if (strukture[0] !=="id") errStructure(obj, "id");
        if (strukture[1] !=="title") errStructure(obj, "title");
        if (strukture[2] !=="ingredients") errStructure(obj, "ingredients")
          else {
            if (Array.isArray(obj.ingredients)) {
              obj.ingredients.forEach((row) => {
                if (typeof row === 'object') {
                  const fields = Object.keys(row);     
                  if (fields[0] !== 'ingr') errStructure(obj, "ingr");
                  if (fields[1] !== 'amount') errStructure(obj, "amount")
                    else if (typeof obj.ingredients.amount !== 'number') errStructure(obj, "amountIsNotNumber");
                  if (fields[2] !== 'measurement') errStructure(obj, "measurement");
                }
                
              })
            }
            else errStructure(obj, 'ingredientsIsNotArray'); 
          }  
        if (strukture[3] !=="coef") errStructure(obj, "coef")
          else {
            if (typeof obj.coef !== 'number' ) errStructure(obj,'coefIsNotNumber')
          };
          if (flagErr !== '') flagErr = objToString + ' ' + flagErr;
      });   
    }
  }
  return flagErr;
}
