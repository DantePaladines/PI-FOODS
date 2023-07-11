import './App.css';
import { Route, Switch, useLocation } from "react-router-dom";
import Landing from './views/landing/landing.jsx';
import Home from './views/home/home.jsx';
import Form from './views/form/form.jsx';
import NavBar from './components/navbar/navbar.jsx';
import Error from './views/error/error.jsx';
import Details from './views/details/details.jsx';

function App() {

  const location = useLocation()

  console.log(location, 'location')

  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar/>}{/*si existe o se evalua en false no retorna la que hay en la derecha*/}
      <Switch>
        <Route exact path='/' component={Landing} />{/*es una pagina estatica */}
        <Route sensitive path='/Home' render={() => <Home/>} />{/*se trabaja con propiedades */}
        <Route exact path="/Form" component={Form} />{/*el pasa componentes con propiedades no acepta solo envia propiedades */}
        <Route exact path="/details" component={Details} />
        {/*falta controlar un error */}
        <Route exact path='*' component={Error} />
      </Switch>
    </div>
  );
}

export default App;