import { useAuth } from 'hooks/useAuth'
import { CountPage, MainPage, LoginPage } from 'pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const user = useAuth()

  if (!user) return <LoginPage />
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
