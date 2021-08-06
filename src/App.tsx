import { useAuthState } from 'react-firebase-hooks/auth'
import { CountPage, MainPage, LoginPage } from 'pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { firebase } from './firebase'

function App() {
  const [user, loading] = useAuthState(firebase.auth())

  if (!user && !loading) return <LoginPage />

  return (
    <Router>
      <Switch>
        <Route path="/:room">
          <CountPage user={user} />
        </Route>
        <Route path="/" exact>
          <MainPage user={user} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
