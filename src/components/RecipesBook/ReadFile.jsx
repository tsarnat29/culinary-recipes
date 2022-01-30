import { useState } from "react";
import { fVerifyStructureFile } from "./fVerifyStructureFile";

const ReadFile = ({recipes, fSetRecipes, fLoaded}) => {
const [changeText, setChangeText] = useState([]);

const objFile = {
  myFile: '',
  text: changeText
} 

function onChangeInputFile(event) {
  let file = event.target.files[0];
  fSetRecipes([]);
  if (file.size > 0) {
    let reader = new FileReader();

    reader.onload = function(event) {
      objFile.myFile=`${file.name}`;
      let strFile = event.target.result;
      recipes = (new Function( "return " + strFile.trim())());
      objFile.text=recipes;
      const res = fVerifyStructureFile(recipes);
      if (res === '') {
        fLoaded(true)
      };
      setChangeText(recipes);
      fSetRecipes(recipes);   
    };

    reader.readAsText(file);
    return objFile;
   }
   else fLoaded(false);
}
return (  
  <div className="fileInput" style={{margin: "5px"}}>
    <input type="file" onChange={event => onChangeInputFile(event)}/>
  </div>          
  )
}
export default ReadFile;