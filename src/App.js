import './App.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

//Components
import Home from './Pages/Home'
import Radioteraquiz from './Pages/Radioteraquiz'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/Radioteraquiz' component={Radioteraquiz} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
