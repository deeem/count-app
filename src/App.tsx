import { Main } from 'pages/main/Main'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:room">count</Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
