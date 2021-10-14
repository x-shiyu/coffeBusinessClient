import React from 'react'
import BaseLayout from './layout/BaseLayout';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from './pages/auth';

import './App.css'

function AppChild() {
  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/register' exact>
            <Auth />
          </Route>
          <Route path='/login' exact>
            <Auth />
          </Route>
          <Route path='/'>
            <BaseLayout />
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default function App() {
  return (
    <RecoilRoot>
      <AppChild />
    </RecoilRoot>
  )
}
