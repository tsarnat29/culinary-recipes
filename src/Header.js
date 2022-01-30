import {NavLink} from 'react-router-dom';
import './styles/Header.css';
function Header() {
  debugger;
  return ( 
    <nav className="Header">
      <ul>
        <li><NavLink to="/"><h4>Загрузка файла рецептів та введення нових</h4></NavLink></li>
        <li><NavLink to="/calculate"><h4>Розрахунок потрібних продуктів з checking</h4></NavLink></li>
        <li><NavLink to="/forSearch"><h4>Розрахунок з автозаповненням</h4></NavLink></li>
      </ul>
    </nav>
  )
}
export default Header;