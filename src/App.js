import './App.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

//Components
import Home from './Pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
