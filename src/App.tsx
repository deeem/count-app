import { useAuthState } from 'react-firebase-hooks/auth'
import { CountPage, MainPage, LoginPage } from 'pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { firebase } from './firebase'
import { UserContex } from 'userContext'

function App() {
  const [user, loading] = useAuthState(firebase.auth())

  // console.log({ user, loading })

  if (!user || loading) return <LoginPage />

  return (
    <UserContex.Provider
      value={{
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }}
    >
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
    </UserContex.Provider>
  )
}

export default App
