import classes from './styles/CheckedRecipes.module.css';

const CheckedRecipes = ({ind, check, fCheck, item}) => {

  const fChangeCheck = (ind) => {
    fCheck(ind);
  }
  
  return (
  <div className={classes.checkInput}>      
       <label><input className={classes.inp} checked={check[ind]||false} onChange={()=>fChangeCheck(ind)} type="checkbox"/><span>{ind+1}</span> <span>{item.title}</span></label> 
      <div className={classes.forCheck}></div> 
  </div>  
  )
}
export default CheckedRecipes;