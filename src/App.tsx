import { CountPage, MainPage } from 'pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:room">
          <CountPage />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
