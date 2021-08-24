import { CountPage, MainPage, LoginPage } from 'pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from 'pages/main/PrivateRoute'

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/loader" exact>
          <div className="flex items-center justify-center h-screen">
            <Loader type="Grid" color="#00BFFF" />
          </div>
        </Route> */}
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/:room">
          <CountPage />
        </PrivateRoute>
        <PrivateRoute path="/" exact>
          <MainPage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default App
