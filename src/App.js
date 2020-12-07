import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Prices from './components/Prices'
import FAQ from './components/FAQ'
import RegisterForm from './components/RegisterForm'
import Watchlist from './components/Watchlist'
import Collection from './components/Collection'
import GXNavbar from './components/GXNavbar'
import LegalNavbar from './components/LegalNavbar'
import UserPage from './components/UserPage'
import Privacy from './components/Privacy'
import './components/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
const App = () => {
  return (
    <main>
      <GXNavbar/>
      <Switch>
        <Route path="/" component={Prices} exact />
        <Route path="/faq" component={FAQ} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/userpage" component={UserPage}/>
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/collection" component={Collection} />
        <Route path="/privacy" component={Privacy} />
      </Switch>
      <LegalNavbar/>
    </main>
  )
}

export default App;
