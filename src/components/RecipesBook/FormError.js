import classes from '../../styles/FormError.module.css';

export const FormErrors = ({formErrors}) =>{
 
  return (
  <div className={classes.formError}>
    {Object.keys(formErrors).map((fieldName, index) => {
      debugger;
      if(formErrors[fieldName].length > 0) {
        return (
          <p key = {index}> {formErrors[fieldName]}</p>
        ) 
      } else {
        return '';
      }
    })}
  </div>
)  
}