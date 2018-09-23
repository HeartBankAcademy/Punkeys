import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Dashboard from './layouts/dashboard/Dashboard'
import Attestation from './layouts/attestation/Attestation'
import MedicalRecord from './layouts/medicalRecord/MedicalRecord'
import AddDoctor from './layouts/addDoctor/AddDoctor'
import Profile from './user/layouts/profile/Profile'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="attestation" component={UserIsAuthenticated(Attestation)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="medicalRecord" component={UserIsAuthenticated(MedicalRecord)} />
          <Route path="addDoctor" component={AddDoctor} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
